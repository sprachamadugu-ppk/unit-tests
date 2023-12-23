import { ChangeEvent, useState } from "react";

const AuthTocken = ({ onSubmit }: { onSubmit: (tocken: string) => void }) => {
  const [tocken, setTocken] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTocken(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit(tocken);
  };

  return (
    <>
      <input onChange={handleInputChange} />
      <button onClick={handleSubmit}>Save</button>
    </>
  );
};

export default AuthTocken;
