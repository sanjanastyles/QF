
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import ContactFormStyles from "./ContactForm.module.css";
import { CONTACT_FORM_PATH } from "../../QF/constants/constant";
import { toast } from "react-toastify";

export const ContactForm = () => {
  const form = useRef();

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    const res = postData(CONTACT_FORM_PATH, formValues)
    res.then(e => e.code === 200 ? toast.success("Created") : toast.error("Something's not write")).catch(e => toast.error("INFERNAL SERVER ERROR"))
  };
  return (
    <div className={ContactFormStyles.contact}>
      <div className={ContactFormStyles.contact_box}>
        <div className={ContactFormStyles.contact_links}>
          <h2>CONTACT US</h2>
          <div className={ContactFormStyles.links}>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                  alt="linkedin"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/YCV2QBJg/github.png"
                  alt="github"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/W4Znvrry/codepen.png"
                  alt="codepen"
                />
              </Link>
            </div>
            <div className={ContactFormStyles.link}>
              <Link to="/">
                <img
                  src="https://i.postimg.cc/NjLfyjPB/email.png"
                  alt="email"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={ContactFormStyles.contact_form_wrapper}>
          <form ref={form} onSubmit={sendEmail}>
            <div className={ContactFormStyles.form_item}>
              <input type="text" name="user_name" required />
              <label>Name:</label>
            </div>
            <div className={ContactFormStyles.form_item}>
              <input type="email" name="user_email" required />
              <label>Email:</label>
            </div>
            <div className={ContactFormStyles.form_item}>
              <textarea className="" name="message" required></textarea>
              <label>Message:</label>
            </div>
            <button
              type="submit"
              value="Send"
              className={ContactFormStyles.submit_btn}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
