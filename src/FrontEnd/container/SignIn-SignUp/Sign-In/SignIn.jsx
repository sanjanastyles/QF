import { useState } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
// import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData, setCookie } from "../../../QF/utils/utils";
import { LOGIN_PATH } from "../../../QF/constants/constant";

export const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = postData(LOGIN_PATH, { email: values.email, password: values.password }).then(e => {
        if (e.code === 200) {
          setCookie('userId', e.data._id)
          localStorage.setItem("response", JSON.stringify(e?.data));
          window.location.reload();
        }
      }).catch(e => { throw new Error("SOMETHING WRONG"); })
      navigate("/");
      toast.success("Login Successfull");
    }
    catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="SignInSignUp">
        <form className="SignInSignUpForm" onSubmit={handleSubmit}>
          <div className="SignInSignUpTitle">Sign In</div>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="SignInSignUpButton">Submit</button>
        </form>
      </div>
    </>
  );
};
