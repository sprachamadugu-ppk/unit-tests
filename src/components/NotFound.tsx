import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={redirectToHome}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default NotFoundPage;
