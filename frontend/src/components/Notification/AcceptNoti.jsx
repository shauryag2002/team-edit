import React, { useEffect, useState } from "react";
import "./AcceptNoti.css";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
const AcceptNoti = () => {
  const [notifications, setNotifications] = useState([]);
  const notificationFunc = async () => {
    const res = await axios.post("/api/user/noti/all", {
      reciever: localStorage.getItem("name"),
    });
    setNotifications(res.data);
  };
  useEffect(() => {
    notificationFunc();
  }, []);
  const acceptNoti = async (doc, name, id) => {
    await fetch("/api/user/col/" + name, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      //   },
      //   {
      body: JSON.stringify({
        docId: doc,
      }),
    });
    deleteNoti(id);
    notificationFunc();
  };
  const deleteNoti = async (id) => {
    await axios.delete("/api/user/noti/" + id);
    notificationFunc();
  };
  return (
    <div className="AcceptNoti">
      <Navbar />
      <div className="HeadingNoti">Your Notifications</div>
      {notifications.length > 0 ? (
        notifications.map((notification, i) => {
          return (
            <div className="NotiWrapper" key={i}>
              <div className="notiMessage">{notification.notification}</div>
              <button
                className="accept"
                onClick={() =>
                  acceptNoti(
                    notification.doc,
                    notification.sender,
                    notification._id
                  )
                }
              >
                Accept
              </button>
              <button
                className="reject"
                onClick={() => deleteNoti(notification._id)}
              >
                Reject
              </button>
            </div>
          );
        })
      ) : (
        <div className="noNoti">No Notifications</div>
      )}
      <div className="footer-style ">
        <Footer />
      </div>
    </div>
  );
};

export default AcceptNoti;
