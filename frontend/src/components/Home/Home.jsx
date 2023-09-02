import React, { useState } from "react";
import "./Home.css";
import Navbar from "./../Navbar/Navbar";
import Document from "./../Document/Document";
import Footer from "./../Footer/Footer";
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { GrChapterAdd } from "react-icons/gr";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [title, setTitle] = useState("");
  const RedirectDoc = async () => {
    if (title) {
      const docId = uuidV4();
      await axios.post("/api/document/create", {
        _id: docId,
        name: title,
        owner: localStorage.getItem("id"),
      });
      history.push(`/documents/${title}/${docId}`);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="addDoc">
        <div className="docHeading">
          <GrChapterAdd />
          Add new document
        </div>
        <div className="title">Title</div>
        <div className="inputDoc">
          <input
            type="text"
            className="docInput"
            placeholder="Write document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={`submitBtn`} onClick={RedirectDoc}>
          <span className="cursor">Create</span>
        </div>
      </div>
      <Document />
      <Footer />
    </div>
  );
};

export default Home;
