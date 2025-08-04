import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store";

const RedirectHome = () => {
  const navigate = useNavigate();
  const {token}=useAuthStore()

  useEffect(() => {
    if (token) {
      navigate("/todos", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RedirectHome;