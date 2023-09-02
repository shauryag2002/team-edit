import React from "react";
import "./Setting.css";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
const Setting = () => {
  const { id } = useParams();
  const [title1, settitle1] = useState("");
  const [doc, setdoc] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const docTitleFunc = async () => {
    const res = await axios.get("/api/document/" + id);
    console.log(res.data);
    setdoc(res.data);
    settitle1(res.data.name);
    let tempCol = [];
    for (let i = 0; i < res.data.collaborators.length; i++) {
      const elem = res.data.collaborators[i];
      tempCol.push(JSON.parse(elem));
    }
    console.log(tempCol);
    setCollaborators(tempCol);
  };
  useEffect(() => {
    docTitleFunc();
    // eslint-disable-next-line
  }, []);
  const handleUpdate = async () => {
    await axios.put("/api/document/" + id, {
      ...doc,
      name: title1,
    });
    // docTitleFunc();
  };
  const handleDeleteCol = async (colId) => {
    await axios.put(
      "/api/user/col/" + colId,
      {
        docId: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
          "content-type": "application/json",
        },
      }
    );
    docTitleFunc();
  };
  console.log(collaborators);
  return (
    <div>
      <Navbar />
      <div className="updateDoc">
        <div className="updateHeading">Update Document Title</div>
        <div className="handleUpdate">
          <input
            type="text"
            placeholder="Update title"
            className="updateDoc1"
            value={title1}
            onChange={(e) => settitle1(e.target.value)}
          />
          <div className="update" onClick={handleUpdate}>
            Update Title
          </div>
        </div>
        <div className="colHeading">Collaborators</div>
        <div className="collaborators">
          {collaborators.map((col, i) => {
            return (
              <div className="singleCol" key={i}>
                <div className="colName">{col.name}</div>
                <div
                  className="deleteCol"
                  onClick={() => handleDeleteCol(col.id)}
                >
                  <AiFillDelete />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${collaborators.length <= 2 ? "footer-style" : null}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Setting;
