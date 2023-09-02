import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./Jodit.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Notification from "./Notification/Notification";
import Navbar from "./Navbar/Navbar";
import { useHistory } from "react-router-dom";
import { db } from "../config";
import "firebase/database";
import { set, ref, onValue } from "firebase/database";
const Jodit = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let [iscol, setIscol] = useState(null);
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      history.push("/login");
    } else {
      const is_collaborator = async () => {
        const res = await axios.post("/api/user/iscol/" + id, {
          userId: localStorage.getItem("id"),
        });
        const is_owner = await axios.post("/api/user/getOwner", {
          docId: id,
        });
        if (res.data.message === false) {
          if (is_owner.data.name === localStorage.getItem("name")) {
            setIscol(true);
          }
        } else {
          setIscol(res.data.message);
        }
      };
      is_collaborator();
    }
    // eslint-disable-next-line
  }, []);

  const countRef = useRef(0);
  const handleChange = (newvalue) => {
    setContent(newvalue);
  };
  //read
  useEffect(() => {
    onValue(ref(db, `/${id}`), (snapshot) => {
      const data = snapshot.val();

      if (data?.content) {
        setContent(data.content);
      }
    });
    // eslint-disable-next-line
  }, []);

  //write
  useEffect(() => {
    if (countRef.current > 0) {
      set(ref(db, `/${id}`), {
        content,
        id,
      });
    }
    countRef.current++;
    // eslint-disable-next-line
  }, [content]);

  return (
    <div>
      {iscol ? (
        <>
          <Navbar />
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => handleChange(newContent)}
            className="full-height"
          />
        </>
      ) : (
        <Notification />
      )}
    </div>
  );
};
export default Jodit;
