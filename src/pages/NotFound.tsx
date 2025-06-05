
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-7xl font-comfortaa font-bold text-rose-500 mb-8">404</h1>
        <div className="max-w-md mx-auto">
          <p className="text-2xl font-comfortaa text-rose-600 mb-6">Oops! Page not found</p>
          <p className="text-rose-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="rose-button px-8 py-6 text-lg"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
