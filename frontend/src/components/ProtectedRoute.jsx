import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useAuth();

    // Check for student data in localStorage for student routes
    const getStudentData = () => {
        try {
            const studentData = localStorage.getItem('studentData');
            return studentData ? JSON.parse(studentData) : null;
        } catch (error) {
            return null;
        }
    };

    const studentData = getStudentData();
    const isStudentRoute = location.pathname.includes('/dash/student');

    // Allow access if it's a student route and student data exists
    if (isStudentRoute && studentData) {
        return children;
    }

    // Check for authenticated user
    if (!user) return <Navigate to="/" replace />;

    if (!user.isOnboarded) {
        if (location.pathname.startsWith('/onboard')) {
            return children;
        }
        return <Navigate to={`/onboard/${user.role}`} replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/dash" replace />;
    }

    return children;
};

export default ProtectedRoute;
