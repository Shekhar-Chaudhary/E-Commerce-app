import { Form, Field } from "formik";
import { NavLink } from 'react-router-dom'

const LoginForm = ({ errors, touched, isValid, dirty }) => {
  return (
    <>
      <Form className="p-2 login-form mx-auto">
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            Email :
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
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password :
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

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid || !dirty}
        >
          Submit
        </button>
        <p className="mt-3">Don't have an account? 
          <NavLink to="/register"><a className="link-info ms-1">Register here</a></NavLink>
        </p>
      </Form>
    </>
  );
};

export default LoginForm;
