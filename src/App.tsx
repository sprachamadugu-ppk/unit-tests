// // src/App.tsx
// import React from 'react';
// import NumberAdder from './Sum';

// const App: React.FC = () => {
//   const numbers = [1, 2, 3, 4, 5];

//   return (
//     <div>
//       <h1>Number Adder App</h1>
//       <NumberAdder numbers={numbers} />
//     </div>
//   );
// };

// export default App;

// App.tsx
import React from "react";
import Parent from "./parent-csv";
// import ComanyForm from './Company-add-form';
// import SimpleForm from './Form';
// import ContextProvider from './Context-provider';

const App: React.FC = () => {
  // const handleFormSubmit = (formData: any) => {
  //   // Handle form submission logic here
  //   console.log('Form submitted with data:', formData);
  // };

  return (
    <div>
      {/* <h1>Simple React Form</h1>
      <SimpleForm onSubmit={handleFormSubmit} /> */}
      {/* <ContextProvider /> */}
      {/* <ComanyForm /> */}
      <Parent />
    </div>
  );
};

export default App;
