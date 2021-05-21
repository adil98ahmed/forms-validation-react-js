import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
function App() {
  const [confirmFlag, setconfirmFlag] = useState(false);
  const [sub, setSub] = useState(false);
  const [pass, setPass] = useState();
  let xx = "";
  const initialvalues = {
    username: "",
    email: "",
    password: "",
    confPassword: "",
    gender: "",
    active: false,
  };
  const onSub = () => {
    setSub(true);
  };
  // /[a-z]{3,}[0-9]{0,4}@[a-z]{3,8}.[a-z]{3}$/
  // /[a-zA-Z0-9]{8,}$/
  const vScheme = {
    username: yup.string().required(),
    email: yup.string().required().email("invalid Email"),
    password: yup
      .string()
      .required("required")
      .matches(/[a-zA-Z0-9]{8,}$/, "invalid Password"),
    confPassword: yup.string().required("required"),
    gender: yup.string().required("gender should be enterd"),
  };

  const LoginForm = useFormik({
    initialValues: initialvalues,
    onSubmit: onSub,
    validationSchema: yup.object(vScheme),
  });
  const checkConfirm = (event) => {
    if (event.target.value == pass) {
      setconfirmFlag(true);
    } else {
      setconfirmFlag(false);
    }
  };
  const setPassword = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className="App f-cont bg-dark mt-5">
      <h2 className="ml-3 mb-4">Register Now !</h2>
      <form className="container " onSubmit={LoginForm.handleSubmit}>
        <div className="row">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="user-name"
              name="username"
              {...LoginForm.getFieldProps("username")}
            />
            {LoginForm.touched.username && LoginForm.errors.username && (
              <div className="text-danger">{LoginForm.errors.username}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <input
              type="email"
              className="form-control "
              placeholder="Email"
              name="email"
              {...LoginForm.getFieldProps("email")}
            />
            {LoginForm.touched.email && LoginForm.errors.email && (
              <div className="text-danger">{LoginForm.errors.email}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="Password"
              name="password"
              onKeyUp={setPassword}
              {...LoginForm.getFieldProps("password")}
            />
            {LoginForm.touched.password && LoginForm.errors.password && (
              <div className="text-danger">{LoginForm.errors.password}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="Confirm Password"
              name="confPassword"
              onKeyUp={checkConfirm}
              value={xx}
              {...LoginForm.getFieldProps("confPassword")}
            />
            {LoginForm.touched.confPassword && confirmFlag == false && (
              <div className="text-danger">salkns</div>
            )}
          </div>

          <div className="col-6 d-flex ">
            <div className="form-group form-check">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={LoginForm.handleChange}
                className="form-check-input px-3"
              />
              <label className="form-check-label ">Male</label>
            </div>

            <div className="form-group form-check px-5">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={LoginForm.handleChange}
                className="form-check-input px-3"
              />
              <label className="form-check-label ">Female</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="active"
                {...LoginForm.getFieldProps("active")}
              />
              <label className="form-check-label">Active</label>
            </div>
          </div>
          {LoginForm.values.gender == "" && LoginForm.submitCount > 0 && (
            <div className="text-danger">{LoginForm.errors.gender}</div>
          )}
          <button className="btn btn-danger w-100">Register</button>
        </div>
      </form>

      {sub&& (
        <div className="text-success">Success Register</div>
      )}
    </div>
  );
}
export default App;
