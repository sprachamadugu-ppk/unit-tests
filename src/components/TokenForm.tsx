import React, { ChangeEvent, useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface AuthTokenProps {
  onSubmit: (token: string) => void;
}

const AuthToken: React.FC<AuthTokenProps> = ({ onSubmit }) => {
  const [token, setToken] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setToken(inputValue);
    setIsButtonDisabled(!inputValue.trim());
  };

  const handleSubmit = () => {
    onSubmit(token);
  };

  return (
    <Box
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Enter Token Here</h2>
      <TextField
        onChange={handleInputChange}
        label="Authorization Token"
        sx={{ marginBottom: 2 }}
      />
      <Box marginTop="auto">
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isButtonDisabled}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AuthToken;
