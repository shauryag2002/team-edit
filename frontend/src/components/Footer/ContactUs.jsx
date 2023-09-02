import React from "react";
import "./ContactUs.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8ds3zbs",
        "template_2e4btfh",
        form.current,
        "pPrXHULe-4xrwKwJZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className=" login">
      <div className="contact">
        <div className="contact-text">GET IN TOUCH</div>

        <form ref={form} onSubmit={sendEmail} className="contact ">
          <label>Name</label>
          <input
            className="input-css2"
            type="text"
            name="user_name"
            placeholder="Your name"
          />
          <label>Email</label>
          <input
            className="input-css2"
            type="email"
            name="user_email"
            placeholder="Email"
          />
          <label>Phone No.</label>
          <input
            className="input-css2"
            type="number"
            name="user_phone"
            id="user_phone"
            placeholder="Phone No."
          />
          <label>Message</label>
          <textarea name="message" placeholder="Write your message" />
          <input className="input-css2" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
