import React, { useEffect, useState } from "react";
import "./Document.css";
import { IoIosSettings } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { db } from "../../config";
import { ref, remove } from "firebase/database";
const Document = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      savedDocsFunc();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [savedDocs, setSavedDocs] = useState([]);
  const savedDocsFunc = async () => {
    const res = await axios.get("/api/document/", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (Array.isArray(res.data)) {
      setSavedDocs(res.data);
    }
  };
  const handlerDelete = async (id) => {
    await axios.delete("/api/document/" + id);
    //delete
    remove(ref(db, `/${id}`));
    savedDocsFunc();
  };
  const handleOpen = async (name, id) => {
    const link = `/documents/${name}/${id}`;
    history.push(link);
  };
  const goSetting = (id, title) => {
    history.push("/setting/" + title + "/" + id);
  };
  return (
    <div className="savedDocs">
      <div className="saved">Saved Document</div>
      <div className={`allDocs ${savedDocs?.length >= 4 ? "scroll" : null}`}>
        {savedDocs?.map((doc, i) => {
          return (
            <div className="singleDoc" key={i}>
              <div
                className="docName cursor"
                onClick={() => handleOpen(doc.name, doc._id)}
              >
                {doc.name}
              </div>
              <div className="type">
                {doc.owner === localStorage.getItem("id")
                  ? "owner"
                  : "collaborator"}
              </div>
              {doc.owner === localStorage.getItem("id") ? (
                <>
                  <div
                    className="settings"
                    onClick={() => goSetting(doc._id, doc.name)}
                  >
                    <IoIosSettings />
                  </div>
                  <div
                    onClick={() => handlerDelete(doc._id)}
                    className="delete"
                  >
                    <AiFillDelete />
                  </div>
                </>
              ) : (
                <>
                  <div className="settings"></div>
                  <div className="delete"></div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Document;
