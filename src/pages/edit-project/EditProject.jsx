import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Select, notification } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProjectAuthorize, getProjectDetailApi } from "../../services/project";
import { useForm } from "antd/es/form/Form";

export default function EditProject() {
  const editorRef = useRef(null);
  // const [form, setForm] = useState({
  //   id: "",
  //   projectName: "",
  //   categoryId: "",
  //   description: ""
  // })
  const [form] = useForm();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProjectDetail();
  }, [params.id]);

  const getProjectDetail = async () => {
    const result = await getProjectDetailApi(params.id);
    console.log(result);
    form.setFieldsValue({
      id: result.data.content.id,
      projectName: result.data.content.projectName,
      categoryId: result.data.content.projectCategory.name,
      description: result.data.content.description,
    })
  };

  const handleFinish = async (values) => {
    const data = {
      id: values.id,
      projectName: values.projectName,
      creator: values.creator,
      description: values.description,
      categoryId: values.categoryId,
    };
    await editProjectAuthorize(data);
    notification.success({
      message: "Cập nhật thành công",
    });
    navigate("/");
  }

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div className="container mt-4">
      <h3>Edit Project</h3>
      <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Project id" name="id">
        <Input />
      </Form.Item>
      <Form.Item label="Project name" name="projectName">
        <Input />
      </Form.Item>
      <Form.Item label="Project category" name="categoryId">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Editor
          required
          name="description"
          apiKey="your-api-key"
          // onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      <Form.Item className="mt-3">
        <Button htmlType="submit">Cập nhật</Button>
      </Form.Item>
    </Form>
    </div>
  );
}
