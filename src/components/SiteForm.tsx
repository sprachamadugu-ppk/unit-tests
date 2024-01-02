import { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { postData } from "../api/api-calls";

import { FormErrors, Site, SiteAddPayload } from "../types";
import { useFetch } from "./usefetch";
import { authToken } from "../context/TokenContext";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SiteForm = () => {
  const initialFormData: Site = {
    siteName: "",
    Location: "",
    simulations: [],
    siteAdmins: [],
  };

  const initialFormErrors: FormErrors = {
    siteName: "",
    Location: "",
    simulations: "",
    siteAdmins: "",
  };

  const [formData, setFormData] = useState<Site>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [showAlert, setShowAlert] = useState(false);

  const { token } = useContext(authToken);

  const navigate = useNavigate();

  const handleInputChange = (field: keyof Site, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    setFormErrors((prevErrors) => {
      let error = "";
      if (Array.isArray(value)) {
        error = value.length > 0 ? "" : `${field} is required`;
      } else {
        error =
          value.length > 0 || value.trim() !== "" ? "" : `${field} is required`;
      }
      return { ...prevErrors, [field]: error };
    });
  };

  const { simulationsData, adminData } = useFetch(token);

  const handleSubmit = async () => {
    const errors: Partial<FormErrors> = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof Site;
      const value = formData[field];

      if (Array.isArray(value)) {
        errors[field] = value.length > 0 ? "" : `${field} is required`;
      } else {
        errors[field] = value.trim() ? "" : `${field} is required`;
      }
    });

    if (Object.values(errors).some((error) => !!error)) {
      setFormErrors(errors as FormErrors);
      console.log("Form has errors. Cannot submit.");
      return;
    }
    console.log(formData.siteAdmins);

    try {
      const updatedFormData: SiteAddPayload = {
        companyId: "6583edd0ba0b57bd2d13b7ff",
        createdAt: null,
        createdBy: null,
        location: formData.Location,
        readAdmins: [{ id: null }],
        simulations: formData.simulations.map(({ id }) => ({ id })),
        siteName: formData.siteName,
        tutorials: [{ id: null }],
        updatedAt: null,
        updatedBy: null,
        writeAdmins: [{ id: "658a737aa0b8998db3121e1e" }],
        _id: null,
      };

      console.log(updatedFormData);

      const data = await postData(updatedFormData, token);
      if (data?.status === 200) {
        handleShowAlert();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const areAllFieldsFilled = Object.values(formData).every((value) =>
    Array.isArray(value) ? value.length > 0 : value.trim() !== "",
  );

  const handleShowAlert = () => {
    setShowAlert(true);
    setFormData(initialFormData);
    setTimeout(() => {
      handleCloseAlert();
    }, 3000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "80%",
          padding: "20px",
        }}
      >
        {showAlert && (
          <Alert severity="success" onClose={handleCloseAlert}>
            <AlertTitle>Success</AlertTitle>
            Successfully created new company .
          </Alert>
        )}
        <form>
          <Typography
            variant="h5"
            sx={{ color: "black", fontFamily: "Arial, sans-serif" }}
          >
            Site Add Form
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                label="Site Name"
                fullWidth
                variant="outlined"
                value={formData.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
                error={Boolean(formErrors.siteName)}
                helperText={formErrors.siteName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                fullWidth
                variant="outlined"
                value={formData.Location}
                onChange={(e) => handleInputChange("Location", e.target.value)}
                error={Boolean(formErrors.Location)}
                helperText={formErrors.Location}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo-2"
                options={simulationsData.map((simulation) => ({
                  id: simulation.id,
                  name: simulation.name,
                }))}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                value={formData.simulations}
                onChange={(_, newValue) =>
                  handleInputChange("simulations", newValue)
                }
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Simulations"
                    placeholder="Favorites"
                    variant="outlined"
                    error={Boolean(formErrors.simulations)}
                    helperText={formErrors.simulations}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo-3"
                options={adminData.map((admin) => ({
                  id: admin.id,
                  firstname: admin.firstname,
                  lastname: admin.lastname,
                }))}
                disableCloseOnSelect
                getOptionLabel={(option) => option.firstname + option.lastname}
                value={formData.siteAdmins}
                onChange={(_, newValue) =>
                  handleInputChange("siteAdmins", newValue)
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.firstname + option.lastname}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company Admin"
                    placeholder="Favorites"
                    variant="outlined"
                    error={Boolean(formErrors.siteAdmins)}
                    helperText={formErrors.siteAdmins}
                  />
                )}
              />
            </Grid>
            <div
              style={{ display: "flex", marginTop: "16px", marginLeft: "16px" }}
            >
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!areAllFieldsFilled}
                >
                  Submit
                </Button>
              </Grid>
              &nbsp;&nbsp;
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>
            </div>
          </Grid>
        </form>
      </div>
    </Layout>
  );
};

export default SiteForm;
