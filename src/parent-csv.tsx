import { useState } from "react";
import { message } from "antd";
import { processData } from "./api-data";
import FileUploadForm, { FormData } from "./Csv-form";
const Parent: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const result = await processData(data);
      console.log("Backend response:", result);
      message.success("File uploaded successfully");
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error processing data:", error);
      message.error("Failed to upload file");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>File Upload Form</h1>
      <FileUploadForm key={refreshKey} onSubmit={handleFormSubmit} />
    </div>
  );
};
export default Parent;
