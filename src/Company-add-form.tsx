import type { FormInstance } from "antd";
import { Button, Form, Input, Space, Row, Col, Select } from "antd";
const { Option } = Select;
const { TextArea } = Input;
import { useState, useEffect } from "react";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const ComanyForm: React.FC = () => {
  const [form] = Form.useForm();

  const tutorialsOptions = ["Tutorial 1", "Tutorial 2", "Tutorial 3"];
  const simulationsOptions = ["Simulation 1", "Simulation 2", "Simulation 3"];
  const companyAdminOptions = ["Admin 1", "Admin 2", "Admin 3"];

  const urlPrefixOptions = ["http://", "https://"];
  const urlSuffixOptions = [".com", ".in", ".jp", ".uk", ".us"];
  const phoneNumberPrefixOptions = [
    "+1 (USA)",
    "+44 (UK)",
    "+81 (Japan)",
    "+91 (IND)",
  ];

  const onFinish = (values: any) => {
    console.log("Form Data:", values);
    form.resetFields();
  };

  return (
    <div>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <h1>Company Form</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="company name"
              label="Company Name"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company url"
              label="Company URL"
              hasFeedback
              validateDebounce={1000}
              rules={[
                { required: true, message: "Please enter the company URL" },
                {
                  message: "Please enter a valid URL",
                },
              ]}
            >
              <Input
                addonBefore={
                  <Select defaultValue="http://">
                    {urlPrefixOptions.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                }
                addonAfter={
                  <Select defaultValue=".com">
                    {urlSuffixOptions.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="tutorials"
              label="Tutorials"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                showSearch
                optionFilterProp="label"
                placeholder="Select a tutorial"
              >
                {tutorialsOptions.map((option, index) => (
                  <Option key={index} value={option} label={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="simulations"
              label="Simulations"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a simulation"
                mode="multiple"
                showSearch
                optionFilterProp="label"
              >
                {simulationsOptions.map((option, index) => (
                  <Option key={index} value={option} label={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="primaryphonenumber"
              label="Primary Phone Number"
              hasFeedback
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                  max: 10,
                  min: 10,
                },
                {
                  pattern: /^\d+$/,
                  message: "Please enter only numbers",
                },
              ]}
            >
              <Input
                addonBefore={
                  <Select defaultValue={phoneNumberPrefixOptions[0]}>
                    {phoneNumberPrefixOptions.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="adminlinkextension"
              label="Admin Link Extension"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="companyadmin"
              label="Company Admin"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                placeholder="Select a company admin"
                showSearch
                optionFilterProp="label"
              >
                {companyAdminOptions.map((option, index) => (
                  <Option key={index} value={option} label={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyoptions"
              label="Company Options"
              hasFeedback
              validateDebounce={1000}
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="Enter company options" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space style={{ justifyContent: "center" }}>
            <SubmitButton form={form} />
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ComanyForm;
