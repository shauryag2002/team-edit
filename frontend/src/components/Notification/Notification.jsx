import React from "react";
import "./Notification.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
const Notification = () => {
  const { id, title } = useParams();
  const sendNoti = async () => {
    const res = await axios.post("/api/user/getOwner", {
      docId: id,
    });
    let owner = res.data.name;
    const message = `User ${localStorage.getItem(
      "name"
    )} has requested access for the document "${title}"`;
    const res2 = await axios.post("/api/user/noti/", {
      type: "Access Request",
      sender: localStorage.getItem("name"),
      reciever: owner,
      notification: message,
      doc: id,
    });
    if (res2.data.message) {
      alert(res2.data.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="Notification">
        <div className="notiHeading">
          you are not authorized to see this document
        </div>
        <button className="sendNotiBtn" onClick={sendNoti}>
          Send Request
        </button>
      </div>
      <div className="footer-style">
        <Footer />
      </div>
    </>
  );
};

export default Notification;
