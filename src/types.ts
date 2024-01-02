export interface SiteAddPayload {
  companyId: string;
  createdAt: null | string;
  createdBy: null | string;
  location: string;
  readAdmins: { id: null }[];
  simulations: { id: string }[];
  siteName: string;
  tutorials: { id: null }[];
  updatedAt: null | string;
  updatedBy: null | string;
  writeAdmins: { id: any }[];
  _id: null | string;
}

export interface SimulationItem {
  _id: string;
  simulationName: string;
}

export interface AdminItem {
  id: any;
  middlename: null | string;
  _id: string;
  firstname: string;
  lastname: string;
}

export interface TutorialItem {
  id: null | string;
}

export interface Site {
  siteName: string;
  Location: string;
  simulations: {
    name: string;
    id: string;
  }[];
  siteAdmins: AdminItem[];
}

export interface FormErrors {
  siteName: string;
  Location: string;
  simulations: string;
  siteAdmins: string;
}

export const SiteData = {
  draw: 1,
  columns: [
    {
      data: "firstname",
      name: "",
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
      searchable: true,
    },
    {
      data: "lastname",
      name: "",
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
      searchable: true,
    },
    {
      data: "middlename",
      name: "",
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
      searchable: true,
    },
    {
      data: "email",
      name: "",
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
      searchable: true,
    },
    {
      data: "role",
      name: "",
      orderable: true,
      search: {
        value: "",
        regex: false,
      },
      searchable: true,
    },
  ],
  length: 10,
  order: [
    {
      column: 0,
      dir: "asc",
    },
  ],
  search: {
    value: "",
    regex: false,
  },
  start: 0,
};
export interface UserData {
  middlename: null | string;
  role: string;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface dashboard {
  name: string;
  count: number;
}

export interface department {
  departmentName: string;
  location: string;
  departmentadmin: string[];
  sites: string[];
}
