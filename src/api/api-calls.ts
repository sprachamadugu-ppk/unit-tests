import axios from "axios";
import { SiteAddPayload, dashboard, department } from "../types";
import { AdminItem, SimulationItem, SiteData } from "../types";

const baseUrl = "https://dev-admin.sunrises.io/api/";

export const getSimulations = async (authToken: string) => {
  const url = "get-company-simulations";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: SimulationItem[] | undefined = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch simulations:",
      response.status,
      response.statusText,
    );
  }
};

export const getDashboard = async (authToken: string) => {
  const url = "dashboard";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: dashboard = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch dashboard details:",
      response.status,
      response.statusText,
    );
  }
};

export const getAdmins = async (authToken: string) => {
  const url = "user-list-by-role?cid=6583edd0ba0b57bd2d13b7ff&role=siteadmin";

  const response = await axios.get(baseUrl + url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data: AdminItem[] | undefined = response.data;
    return data;
  } else {
    console.error(
      "Failed to fetch simulations:",
      response.status,
      response.statusText,
    );
  }
};

export const postData = async (formData: SiteAddPayload, authToken: string) => {
  const updatedFormData = {
    ...formData,
  };

  const updatedFormData1 = {
    ...updatedFormData,
  };
  console.log(updatedFormData1);
  const url = "site";
  const response = await fetch(baseUrl + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFormData1),
  });
  if (response.ok) {
    return response;
  } else {
    console.error("Failed to post data:", response.status, response.statusText);
  }
};

export const editDepartment = async (
  formData: department,
  departmentId: string,
  authToken: string,
) => {
  const url = "edit-department";
  try {
    const response = await axios.put(
      baseUrl + url,
      {
        ...formData,
        primaryAddress: null,
        _id: departmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        "Failed to edit department:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Error editing department:", error);
  }
};

export const getSites = async (authToken: string) => {
  const url = "users-by-role?role=siteadmin";
  const response = await axios.post(baseUrl + url, SiteData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const data: any = response.data;
    return data;
    console.log(data);
  } else {
    console.error(
      "Failed to fetch site admins:",
      response.status,
      response.statusText,
    );
  }
};

export const sites = async (authToken: string) => {
  const url = "get-sites";

  try {
    const response = await axios.get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        "Failed to fetch department data:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
};
export const getDepartmentById = async (
  departmentId: string,
  authToken: string,
) => {
  const url = `get-department-with-id?_id=${departmentId}`;

  try {
    const response = await axios.get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.error(
        "Failed to fetch department data:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
};
