import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { editDepartment, getDepartmentById, sites } from "../api/api-calls";
import { authToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DepartmentEditForm({
  departmentId,
}: {
  departmentId: string;
}) {
  const [formData, setFormData] = useState({
    departmentName: "",
    location: "",
    departmentadmin: [],
    sites: [],
  });
  const [siteNames, setSiteNames] = useState<string[]>([]);
  const { token } = useContext(authToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteNames = await sites(token);
        setSiteNames(siteNames);
      } catch (error) {
        console.error("Error fetching site names:", error);
      }
    };

    if (siteNames.length === 0) {
      fetchData();
    }
    console.log("site anmes", siteNames);

    getDepartmentById(departmentId, token)
      .then((data) => {
        setFormData({
          departmentName: data.data.departmentName || "",
          location: data.data.location || "",
          departmentadmin: data.data.departmentadmin || [],
          sites: data.data.sites || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, [departmentId, token, siteNames]);

  const handleBackClick = () => {
    navigate("/dashboard");
  };
  const handleInputChange =
    (fieldName: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    };

  const handleAutocompleteChange =
    (fieldName: keyof typeof formData) => (_: any, value: any) => {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    try {
      await editDepartment(formData, departmentId, token);
      alert('updated successfully');
      navigate('/dashboard')
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Department Edit Form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Department Name"
              size="small"
              placeholder="Department Name"
              value={formData.departmentName}
              onChange={handleInputChange("departmentName")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location"
              size="small"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange("location")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              multiple
              options={formData.departmentadmin || []}
              disableCloseOnSelect
              getOptionLabel={(option: any) => option.id}
              renderOption={(props, option: any, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.id}
                </li>
              )}
              style={{ width: "100%" }}
              value={formData.departmentadmin}
              onChange={handleAutocompleteChange("departmentadmin")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department Admin"
                  placeholder="select"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              size="small"
              multiple
              options={siteNames.map((names: any) => ({
                id: names._id,
                name: names.siteName,
              }))}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: "100%" }}
              value={formData.sites}
              onChange={handleAutocompleteChange("sites")}
              renderInput={(params) => (
                <TextField {...params} label="Sites" placeholder="select" />
              )}
            />
          </Grid>
        </Grid>
        <div style={{ display: "flex", marginTop: "16px" }}>
          <Button
            variant="contained"
            style={{
              width: "fit-content",
              alignSelf: "flex-start",
              marginTop: "16px",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            style={{
              width: "fit-content",
              alignSelf: "flex-start",
              marginTop: "16px",
            }}
            onClick={handleBackClick}
          >
            Back
          </Button>
        </div>
      </Box>
    </Layout>
  );
}
