import { Navigate } from "react-router";
import { useAuthStore } from "../store";

interface Props { 
    children: React.ReactNode 
}

const ProtectedRoute:React.FC<Props> = ({ children }) => {
    const token = useAuthStore((s) => s.token);
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute