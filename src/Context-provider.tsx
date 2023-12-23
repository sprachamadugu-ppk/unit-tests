import { useState } from "react";
import AuthTocken from "./AuthToken";
import { authTocken } from "./Create-context";
import CompanyAddForm from "./UseContext";
const ContextProvider = () => {
  const [tocken, setTocken] = useState<string>("");

  const handleSubmit = (tocken: string) => {
    setTocken(tocken);
  };
  return (
    <>
      <AuthTocken onSubmit={handleSubmit} />
      <authTocken.Provider value={{ tocken }}>
        <CompanyAddForm />
      </authTocken.Provider>
    </>
  );
};

export default ContextProvider;
