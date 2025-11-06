import { useEffect } from "react";
import { useNavigate,  } from "react-router-dom";

export default function GitHubAuthSuccess() {
  const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
  
    useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log(token);
      navigate("/"); // Redirect to logged-in page
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="flex bg-gray-300 text-gray-800 shadow-md max-w-md">Signing you in...</p>;
}
