import React, { useState } from "react";
import { message, Input, Select, Button, Form } from "antd";

type RowObject = { [key: string]: string };

export interface FormData {
  email: string;
  fileType: string;
  fileContents: RowObject[];
}

interface FileUploadFormProps {
  onSubmit: (data: FormData) => void;
}

const { Option } = Select;

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [fileTypeValid, setFileTypeValid] = useState(true);
  const [fileUploading, setFileUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isCSV = (file: File) => {
    return file.name.toLowerCase().endsWith(".csv");
  };

  const beforeUpload = (file: File) => {
    if (!isCSV(file)) {
      message.error("Invalid file type. Please select a valid CSV file.");
      setFileTypeValid(false);
    } else {
      setFileTypeValid(true);
      setSelectedFile(file);
    }
    return false;
  };

  const parseCSV = (fileContentsString: string): RowObject[] => {
    const rows = fileContentsString.split("\n");
    const header = rows[0].split(",").map((field) => field.trim());

    return rows.slice(1).map((row) => {
      const values = row.split(",").map((value) => value.trim());
      const instance: RowObject = {};
      header.forEach((fieldName, index) => {
        instance[fieldName] = values[index];
      });
      return instance;
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { email, fileType } = values;

      if (fileTypeValid && selectedFile) {
        setFileUploading(true);

        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const fileContentsString = event.target?.result as string;
            const fileContents = parseCSV(fileContentsString);

            onSubmit({
              email,
              fileType,
              fileContents,
            });

            form.resetFields();
            setFileUploading(false);
            message.success("File uploaded successfully");
          } catch (error) {
            console.error("Error parsing file:", error);
            setFileTypeValid(false);
            setFileUploading(false);
          }
        };

        reader.readAsText(selectedFile);
      }
    } catch (error) {
      console.error("Error validating form:", error);
      setFileTypeValid(false);
      setFileUploading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="File Type"
        name="fileType"
        rules={[{ required: true, message: "Please select a file type!" }]}
      >
        <Select>
          <Option value="site file">Site File</Option>
          <Option value="department file">Department File</Option>
          <Option value="employee file">Employee File</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Upload File">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              beforeUpload(file);
            }
          }}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={fileUploading}>
        Submit
      </Button>
    </Form>
  );
};

export default FileUploadForm;
