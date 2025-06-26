import { useEffect } from "react";

const OAuthRedirect = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/"; // or navigate("/dashboard") if using React Router
    }
  }, []);

  return (
    <div className="text-center text-lg font-medium mt-20 text-gray-600">
      Logging in with Google...
    </div>
  );
};

export default OAuthRedirect;
