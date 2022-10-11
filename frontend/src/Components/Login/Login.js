

import { Formik } from "formik";
import * as Yup from "yup";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .required("Password is required."),
  });

  const loginHandler = (data) => {
    localStorage.setItem("login", true);

    const getUserData = JSON.parse(localStorage.getItem("userData"));
    console.log(getUserData);

    if(!getUserData) {
      toast.error("User is not registered!");
      return;
    }
    
    if (
      getUserData.email === data.email &&
      getUserData.password === data.password
    ) {
      console.log("Logged in successfully....");
      navigate("/home");
    } else  {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <div className=" login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 px-0 d-none d-sm-block">
              <img
                src="https://t3.ftcdn.net/jpg/02/24/86/92/360_F_224869243_WZHOVD3GqYq6ZUzRkZbQNTXzg1FzHwhd.jpg"
                alt="Login image"
                className="w-100  login-img img-fluid mt-5"
              />
            </div>
            <div className="col-md-6 justify-content-sm-center pt-4 w-40">
              <div className="col-sm-12  pb-3">
                <h1 className="text-center pt-3 text-secondary mb-4">Login</h1>

                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(value, { resetForm }) => {
                    console.log(value);
                    loginHandler(value);
                    resetForm();
                  }}
                  validationSchema={LoginSchema}
                  component={LoginForm}
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
export default Login;

