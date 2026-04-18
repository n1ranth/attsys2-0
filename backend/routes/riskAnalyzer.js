import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Clear all students for a specific session
router.delete('/clear-session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        // Clear students with this session ID AND students without session IDs (old data)
        const [sessionResult, oldResult] = await Promise.all([
            Student.deleteMany({ teacherSession: sessionId }),
            Student.deleteMany({ teacherSession: { $exists: false } })
        ]);
        
        const totalDeleted = sessionResult.deletedCount + oldResult.deletedCount;
        
        res.json({
            success: true,
            deletedCount: totalDeleted,
            sessionDeleted: sessionResult.deletedCount,
            oldDeleted: oldResult.deletedCount,
            message: `Cleared ${totalDeleted} students (${sessionResult.deletedCount} from session, ${oldResult.deletedCount} old records)`
        });
    } catch (error) {
        console.error('Error clearing session students:', error);
        res.status(500).json({ error: 'Failed to clear session students' });
    }
});

// Emergency clear all students (for debugging)
router.delete('/clear-all', async (req, res) => {
    try {
        const result = await Student.deleteMany({});
        
        res.json({
            success: true,
            deletedCount: result.deletedCount,
            message: `Emergency clear: removed all ${result.deletedCount} students`
        });
    } catch (error) {
        console.error('Error clearing all students:', error);
        res.status(500).json({ error: 'Failed to clear all students' });
    }
});

// Get students for risk analysis (filtered by session if provided)
router.get('/students', async (req, res) => {
    try {
        const { sessionId } = req.query;
        
        let query = {};
        if (sessionId) {
            query.teacherSession = sessionId;
        }
        
        const students = await Student.find(query).sort({ generatedAt: -1 }).limit(100);
        res.json({
            success: true,
            data: students,
            count: students.length,
            sessionId: sessionId || 'all'
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch student data'
        });
    }
});

// Get risk analysis summary
router.get('/summary', async (req, res) => {
    try {
        const students = await Student.find();
        
        // Calculate risk distribution
        const riskDistribution = {
            Low: 0,
            Medium: 0,
            High: 0
        };
        
        let totalAttendance = 0;
        let totalMarks = 0;
        let totalEngagement = 0;
        let totalAssignments = 0;
        
        students.forEach(student => {
            // Count risk levels
            const riskLevel = student.aiInsights?.riskLevel || 'Medium';
            riskDistribution[riskLevel]++;
            
            // Sum metrics
            totalAttendance += student.attendance;
            totalMarks += student.marks;
            totalEngagement += student.engagement;
            totalAssignments += student.assignments;
        });
        
        const count = students.length;
        const averages = {
            attendance: count > 0 ? Math.round((totalAttendance / count) * 100) / 100 : 0,
            marks: count > 0 ? Math.round((totalMarks / count) * 100) / 100 : 0,
            engagement: count > 0 ? Math.round((totalEngagement / count) * 100) / 100 : 0,
            assignments: count > 0 ? Math.round((totalAssignments / count) * 100) / 100 : 0
        };
        
        // Identify at-risk students (High risk or multiple low metrics)
        const atRiskStudents = students.filter(student => {
            const riskLevel = student.aiInsights?.riskLevel;
            if (riskLevel === 'High') return true;
            
            // Check for multiple low metrics
            const lowMetrics = [
                student.attendance < 60,
                student.marks < 60,
                student.engagement < 60,
                student.assignments < 60
            ].filter(Boolean).length;
            
            return lowMetrics >= 3;
        });
        
        res.json({
            success: true,
            data: {
                totalStudents: count,
                riskDistribution,
                averages,
                atRiskStudents: atRiskStudents.map(s => ({
                    student_id: s.student_id,
                    name: s.name,
                    riskLevel: s.aiInsights?.riskLevel || 'Medium',
                    attendance: s.attendance,
                    marks: s.marks,
                    engagement: s.engagement,
                    assignments: s.assignments,
                    insights: s.aiInsights?.insights || []
                })),
                atRiskCount: atRiskStudents.length
            }
        });
    } catch (error) {
        console.error('Error generating risk summary:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate risk summary'
        });
    }
});

// Add or update student data
router.post('/student', async (req, res) => {
    try {
        const { student_id, name, attendance, marks, engagement, assignments, archetype, characteristics, aiInsights } = req.body;
        
        const studentData = {
            student_id,
            name,
            attendance,
            marks,
            engagement,
            assignments,
            archetype,
            characteristics,
            aiInsights,
            lastUpdated: new Date()
        };
        
        const student = await Student.findOneAndUpdate(
            { student_id },
            studentData,
            { upsert: true, new: true }
        );
        
        res.json({
            success: true,
            data: student,
            message: 'Student data saved successfully'
        });
    } catch (error) {
        console.error('Error saving student data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save student data'
        });
    }
});

export default router;
