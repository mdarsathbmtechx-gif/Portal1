import React, { useState } from "react";
import { Form, Input, Select, Radio, Button, Card, Steps, Checkbox, message } from "antd";
import RecruiterNavbar from "../RecruiterLayout/RecruiterNavbar";

const { TextArea } = Input;
const { Step } = Steps;

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then(() => setCurrentStep((prev) => prev + 1))
      .catch((err) => console.log(err));
  };

  const prev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    setLoading(true);
    console.log("Final Job Data:", values);
    setTimeout(() => {
      setLoading(false);
      message.success("Job posted successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <div className="mt-18 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Post a Job</h1>

        <Card className="bg-white shadow-xl rounded-xl p-6">
          <Steps current={currentStep} className="mb-6">
            <Step title="Job Details" />
            <Step title="Candidate Requirement" />
            <Step title="Company Details" />
          </Steps>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* ------------------- Step 1: Job Details ------------------- */}
            {currentStep === 0 && (
              <>
                <Form.Item
                  name="about"
                  label="About the Job"
                  rules={[{ required: true, message: "Please select job category" }]}
                >
                  <Select placeholder="Select job category" allowClear>
                    <Select.Option value="software">Software / IT</Select.Option>
                    <Select.Option value="marketing">Marketing</Select.Option>
                    <Select.Option value="sales">Sales</Select.Option>
                    <Select.Option value="hr">Human Resources</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="title"
                  label="Select Job Title"
                  rules={[{ required: true, message: "Please select job title" }]}
                >
                  <Select placeholder="Select job title">
                    <Select.Option value="frontend">Frontend Developer</Select.Option>
                    <Select.Option value="backend">Backend Developer</Select.Option>
                    <Select.Option value="designer">UI/UX Designer</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="description" label="+ Add Job Description (Optional)">
                  <TextArea rows={4} placeholder="Job description" />
                </Form.Item>

                <Form.Item name="openings" label="Number of Openings">
                  <Input type="number" placeholder="Enter number of openings" />
                </Form.Item>

                <Form.Item label="Monthly Income">
                  <Input.Group compact>
                    <Form.Item name="minSalary" noStyle>
                      <Input type="number" placeholder="Min Salary" style={{ width: '48%' }} />
                    </Form.Item>
                    <Form.Item name="maxSalary" noStyle>
                      <Input type="number" placeholder="Max Salary" style={{ width: '48%', marginLeft: '4%' }} />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={next} className="w-full bg-green-600 hover:bg-green-700">
                    Next
                  </Button>
                </Form.Item>
              </>
            )}

            {/* ------------------- Step 2: Candidate Requirement ------------------- */}
            {currentStep === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Candidate Requirement</h2>

                <Form.Item name="education" label="Minimum Education" rules={[{ required: true }]}>
                  <Select placeholder="Select minimum education">
                    <Select.Option value="10th">10th</Select.Option>
                    <Select.Option value="12th">12th</Select.Option>
                    <Select.Option value="diploma">Diploma/ITI</Select.Option>
                    <Select.Option value="graduate">Graduate</Select.Option>
                    <Select.Option value="postgraduate">Post Graduate</Select.Option>
                    <Select.Option value="notrequired">Not Required</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
                  <Select placeholder="Select experience">
                    <Select.Option value="less1">Less than 1 year</Select.Option>
                    <Select.Option value="1-3">1-3 Years</Select.Option>
                    <Select.Option value="3-5">3-5 Years</Select.Option>
                    <Select.Option value="5-10">5-10 Years</Select.Option>
                    <Select.Option value="10plus">10+ Years</Select.Option>
                    <Select.Option value="any">Any Experience</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="gender" label="Preferred Gender" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="any">Any Gender</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item name="skills" label="Skills Required">
                  <Select mode="tags" placeholder="Add other skills"></Select>
                </Form.Item>

                <Form.Item name="manageCandidates" label="Manage Candidates Through">
                  <Select mode="tags" placeholder="Select method">
                    <Select.Option value="calls">Calls only</Select.Option>
                    <Select.Option value="calls_whatsapp">Calls and Whatsapp</Select.Option>
                    <Select.Option value="apply_only">Apply only</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="terms" valuePropName="checked" rules={[{ required: true, message: 'You must agree to the terms' }]}>
                  <Checkbox>I agree to the Lokal’s terms and conditions</Checkbox>
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-between">
                    <Button onClick={prev}>Previous</Button>
                    <Button type="primary" onClick={next}>
                      Next
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}

            {/* ------------------- Step 3: Company Details ------------------- */}
            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Company Details</h2>

                <Form.Item
                  name="companyType"
                  label="Select Your Company Type"
                  rules={[{ required: true, message: "Please select company type" }]}
                >
                  <Select placeholder="Select company type">
                    <Select.Option value="consultancy">Consultancy / Manpower firm</Select.Option>
                    <Select.Option value="mycompany">I hire for my company / store</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="companyName"
                  label="Company"
                  rules={[{ required: true, message: "Please enter company name" }]}
                >
                  <Input placeholder="Enter company name" />
                </Form.Item>

                <Form.Item
                  name="companyEmail"
                  label="Company Email"
                  rules={[
                    { required: true, message: "Please enter company email" },
                    { type: "email", message: "Please enter a valid email" }
                  ]}
                >
                  <Input placeholder="Enter company email" />
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-between">
                    <Button onClick={prev}>Previous</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form>
        </Card>
      </div>
    </div>
  );
}
