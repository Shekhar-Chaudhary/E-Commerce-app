import { Form, Field } from "formik";
import { NavLink } from "react-router-dom";

const RegisterForm = ({ errors, touched, isValid, dirty }) => {
  return (
    <>
      <Form className="p-0 mx-auto signup-form">
        <div className="row">
          <div className="col-md-6 mb-2">
            <label for="name" className="form-label">
              First Name
            </label>
            <Field
              type="text"
              className={
                touched.firstname
                  ? `form-control ${errors.firstname ? "invalid" : "valid"}`
                  : `form-control`
              }
              name="firstname"
            />
            {touched.firstname && errors.firstname && (
              <small className="text-danger">{errors.firstname}</small>
            )}
          </div>

          <div className="col-md-6 mb-2 ">
            <label for="name" className="form-label">
              Last Name
            </label>
            <Field
              type="text"
              className={
                touched.lastname
                  ? `form-control ${errors.firstname ? "invalid" : "valid"}`
                  : `form-control`
              }
              name="lastname"
            />
            {touched.lastname && errors.lastname && (
              <small className="text-danger">{errors.lastname}</small>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <Field
            type="email"
            name="email"
            className={
              touched.email
                ? `form-control ${errors.email ? "invalid" : "valid"}`
                : `form-control`
            }
          />
          {touched.email && errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <Field
            type="password"
            name="password"
            className={
              touched.password
                ? `form-control ${errors.password ? "invalid" : "valid"}`
                : `form-control`
            }
          />
          {touched.password && errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <Field
            type="password"
            name="confirmpassword"
            className={
              touched.confirmpassword
                ? `form-control ${errors.confirmpassword ? "invalid" : "valid"}`
                : `form-control`
            }
          />
          {touched.confirmpassword && errors.confirmpassword && (
            <small className="text-danger">{errors.confirmpassword}</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid || !dirty}
        >
          Submit
        </button>
        <p className="text-center text-muted mt-3 mb-1">
          Have already an account?{" "}
          <a href="#!" className="fw-bold text-body">
            <NavLink to="/">
              {" "}
              <u>Login here</u>
            </NavLink>
          </a>
        </p>
      </Form>
    </>
  );
};

export default RegisterForm;
