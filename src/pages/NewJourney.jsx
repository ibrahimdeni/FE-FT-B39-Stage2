// import TextEditor from "../components/TextEditor";
import Layout from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";

export default function NewJourney() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); // preview foto
  const [message, setMessage] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  // const [npreview, setNpreview] = useState();
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  //ini handle input
  const handleChange = (event) => {
    // console.log("Name: ", event.target.name);
    // console.log("Value: ", event.target.value);
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === "file" ? event.target.files : event.target.value,
    });

    if (event.target.type === "file") {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };
  console.log("ini preview", preview);

  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      formData.set("title", form?.title);
      formData.set("description", form?.description);
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.post("/journey", formData, config);
      console.log("IKI RESEKPON 2", response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");

      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Heyyoo!",
        text: "You have to login first~",
      });

      navigate("/");
    }
  }, []);

  return (
    <>
      <Layout />
      <div className="d-flex w-100 mt-5">
        <div className="title-NJ mx-auto">
          <h1 className="fw-bold text-start">New Journey</h1>
        </div>
      </div>
      <div className="w-100 d-flex mb-5">
        <Form
          onSubmit={(event) => handleSubmit.mutate(event)}
          className="form_NJ mx-auto mt-3"
        >
          <div className="d-flex">
            <div className="w-75">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Title</Form.Label>
                <Form.Control
                  name="title"
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  className="shadow border-info border-opacity-50"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold fs-5 mt-1">
                  Main Photo
                </Form.Label>
                <Form.Control
                  name="image"
                  className="shadow border-info border-opacity-50"
                  onChange={handleChange}
                  type="file"
                />
              </Form.Group>
            </div>
            <img
              style={{ width: "100%", height: "170px", objectFit: "cover" }}
              className="shadow border border-1 rounded-3 w-25 m-2 mt-1 border-info border-opacity-50"
              src={preview}
              alt="preview-img"
            />
          </div>
          <Form.Group>
            <Form.Label className="fw-bold fs-5 mt-2">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              style={{ resize: "none" }}
              onChange={handleChange}
              className="shadow border-info border-opacity-50"
              type="text"
            />
            {/* <TextEditor /> */}
          </Form.Group>
          <div className="w-100 d-flex">
            <Button
              className="m-auto mt-4 btn_post fw-semibold shadow"
              type="submit"
            >
              Post
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
