import { useContext } from "react";
import { authTocken } from "./Create-context";

const CompanyAddForm = () => {
  const { tocken } = useContext(authTocken);
  console.log(tocken);

  return <>{tocken && <input value={tocken} />}</>;
};

export default CompanyAddForm;
