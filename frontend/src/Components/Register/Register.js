import { Formik } from "formik";
import * as Yup from "yup";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required."),
    lastname: Yup.string().required("Last Name is required."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .required("Password is required."),
    confirmpassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  

  const submitHandler = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    toast.success("Account Created Successfully");
  };

  return (
    <>
      <div className="">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-6 px-0 d-none d-sm-block">
              <img
                src="https://t3.ftcdn.net/jpg/02/24/86/92/360_F_224869243_WZHOVD3GqYq6ZUzRkZbQNTXzg1FzHwhd.jpg"
                alt="Login image"
                className="w-100 signup-img img-fluid mt-5"
              />
            </div>

            <div className="col-md-6 justify-content-sm-center pt-1">
              <div className="col-sm-12">
                <h3 className="text-center pt-3 text-secondary">
                  CREATE AN ACCOUNT
                </h3>
                <hr />
                <Formik
                  initialValues={{
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
                  }}
                  onSubmit={(value, { resetForm }) => {
                    console.log(value);
                    submitHandler(value);
                    resetForm();
                  }}
                  validationSchema={SignUpSchema}
                  component={RegisterForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Register;
