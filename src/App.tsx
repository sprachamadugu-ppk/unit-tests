// // // src/App.tsx
// // import React from 'react';
// // import NumberAdder from './Sum';

// // const App: React.FC = () => {
// //   const numbers = [1, 2, 3, 4, 5];

// //   return (
// //     <div>
// //       <h1>Number Adder App</h1>
// //       <NumberAdder numbers={numbers} />
// //     </div>
// //   );
// // };

// // export default App;

// // App.tsx
// import React from "react";
// import Parent from "./parent-csv";
// // import ComanyForm from './Company-add-form';
// // import SimpleForm from './Form';
// // import ContextProvider from './Context-provider';

// const App: React.FC = () => {
//   // const handleFormSubmit = (formData: any) => {
//   //   // Handle form submission logic here
//   //   console.log('Form submitted with data:', formData);
//   // };

//   return (
//     <div>
//       {/* <h1>Simple React Form</h1>
//       <SimpleForm onSubmit={handleFormSubmit} /> */}
//       {/* <ContextProvider /> */}
//       {/* <ComanyForm /> */}
//       <Parent />
//     </div>
//   );
// };

// export default App;



import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthToken from "./components/TokenForm";
import { authToken } from "./context/TokenContext";
import SiteForm from "./components/SiteForm";
import SiteTable from "./components/Table";
import DepartmentForm from "./components/DepartmentForm";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => {
  const [token, setToken] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(true);

  const handleSubmit = (userToken: string) => {
    setToken(userToken);
    setAuth(false);
  };

  return (
    <Router>
      <authToken.Provider value={{ token }}>
        <Routes>
          <Route
            path="/"
            element={
              auth ? (
                <AuthToken onSubmit={handleSubmit} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard />
              ) : (
                <>
                  <Navigate to="/" />
                </>
              )
            }
          />
          <Route path="/site-form" element={<SiteForm />} />
          <Route path="/site-table" element={<SiteTable />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<NotFound />} />
          <Route
            path="/edit-department"
            element={<DepartmentForm departmentId="658e6bd5fa8ef47f78cd239b" />}
          />
        </Routes>
      </authToken.Provider>
    </Router>
  );
};

export default App;
