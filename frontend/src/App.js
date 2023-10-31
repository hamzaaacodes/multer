import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import UploadList from "./components/UploadList";
import { BACKEND_URI } from "./config/constants";

const App = () => {
  const [medias, setMedias] = useState([]);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((err) => {
        setMedias([]);
        console.log(err);
        alert("Error happened!");
      });
  };


  useEffect(()=> {
    getAllMedias();
  }, [])


  return (
    <>
      <div className="row d-flex">
        <h1 className="mx-4 my-4">Video Upload</h1>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "700px",
              margin: "40px",
              border: "1px solid #000",
            }}
          >
            <div className="card-body">
              <UploadForm getAllMedias={getAllMedias} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "700px",
              margin: "40px",
              border: "1px solid #000",
            }}
          >
            <div className="card-body">
              <UploadList medias={medias} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
