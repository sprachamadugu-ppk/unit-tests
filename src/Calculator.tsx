import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [result, setResult] = useState<number | string>("");

  const handleNumChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    numType: "num1" | "num2",
  ) => {
    const value = e.target.value;

    if (!isNaN(Number(value))) {
      if (numType === "num1") {
        setNum1(Number(value));
      } else {
        setNum2(Number(value));
      }
    }
  };

  const handleOperation = (operation: "+" | "-" | "*" | "/") => {
    if (num1 === "" || num2 === "") {
      setResult("Invalid input");
      return;
    }

    let result;

    switch (operation) {
      case "+":
        result = (num1 + num2).toFixed(2);
        break;
      case "-":
        result = (num1 - num2).toFixed(2);
        break;
      case "*":
        result = (num1 * num2).toFixed(2);
        break;
      case "/":
        result = (num1 / num2).toFixed(2);
        break;
      default:
        result = "";
    }

    setResult(result);
    console.log(result);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Calculator
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Number 1"
          variant="outlined"
          fullWidth
          type="number"
          value={num1}
          onChange={(e) => handleNumChange(e, "num1")}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Number 2"
          variant="outlined"
          fullWidth
          type="number"
          value={num2}
          onChange={(e) => handleNumChange(e, "num2")}
        />
      </Grid>
      <Grid item xs={12} container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleOperation("+")}
          >
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleOperation("-")}
          >
            Subtract
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleOperation("*")}
          >
            Multiply
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleOperation("/")}
          >
            Divide
          </Button>
        </Grid>
      </Grid>
      {result !== "" && (
        <Grid item xs={12}>
          <Typography
            variant="h6"
            align="center"
            style={{ backgroundColor: "dodgerblue" }}
          >
            Result: {typeof result === "number" ? result.toFixed(2) : result}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Calculator;
