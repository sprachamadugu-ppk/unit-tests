import { useContext, useEffect, useState } from "react";
import { getSites } from "../api/api-calls";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { UserData } from "../types";
import { authToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const SiteTable = () => {
  const [siteData, setsiteData] = useState<UserData[]>([]);
  const { token } = useContext(authToken);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getSites(token);
      setsiteData(data.data);
      console.log(data);
    };
    fetchdata();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const renderTable = () => {
    return (
      <Layout>
        <Typography variant="h5">Site Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siteData.map((site, index) => (
                <TableRow key={index} hover style={{ cursor: "pointer" }}>
                  <TableCell>{site.firstname}</TableCell>
                  <TableCell>{site.lastname}</TableCell>
                  <TableCell>{site.middlename}</TableCell>
                  <TableCell>{site.email}</TableCell>
                </TableRow>
              ))}
              <br />
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    );
  };

  return (
    <Layout>
      {/* <div style={{ marginLeft: 300 }}> */}
      {/* <h2>site Details</h2> */}
      {siteData.length > 0 ? renderTable() : "Loading..."}
      {/* </div> */}
    </Layout>
  );
};

export default SiteTable;
