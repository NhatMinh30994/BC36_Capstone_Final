import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { fetchProjectCategory } from "../../services/projectCategory";
import { createProjectAuthorize } from "../../services/project";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const editorRef = useRef(null);
  // console.log(editorRef.current.getContent())
  const navigate = useNavigate();
  const [state, setState] = useState({
    projectName: "",
    description: "",
    categoryId: "",
  });
  const [projectCategory, setProjectCategory] = useState([]);

  useEffect(() => {
    getProjectCategory();
  }, []);

  const getProjectCategory = async () => {
    const result = await fetchProjectCategory();
    // console.log(result);
    setProjectCategory(result.data.content);
  };

  const renderProjectCategory = () => {
    return projectCategory.map((ele, idx) => {
      return (
        <option key={idx} value={ele.id}>
          {ele.projectCategoryName}
        </option>
      );
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name)
    // console.log(value)
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(editorRef.current.getContent());
    const dataCreated = {
      ...state,
      description: editorRef.current.getContent(),
    };
    const result = await createProjectAuthorize(dataCreated);
    notification.success({
      message: "Thêm dự án thành công",
    });
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>Create Project</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            type="text"
            name="projectName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <Editor
            required
            name="description"
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 400,
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
        </div>
        <div className="form-group">
          <select
            className="custom-select"
            name="categoryId"
            onChange={handleChange}
          >
            {renderProjectCategory()}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create project
        </button>
      </form>
    </div>
  );
}
