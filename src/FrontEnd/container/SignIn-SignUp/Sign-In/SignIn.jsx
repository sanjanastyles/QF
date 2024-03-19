import { useState } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
// import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../../../QF/utils/utils";
import { LOGIN_PATH } from "../../../QF/constants/constant";

export const SignIn = () => {
  const navigate = useNavigate();
  // const { setAuth } = useContext(AuthContext);

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
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = postData(LOGIN_PATH, { email: values.email, password: values.password })
      // window.location.reload();
      navigate("/");
      toast.success("Login Successfull");
      if(response.code < 300)
      localStorage.setItem("response", JSON.stringify(response?.data));
    } catch (err) {
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
