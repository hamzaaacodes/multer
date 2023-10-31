import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Videos don't go in backend in JSON, they go in form-data.
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("name", name);

    // Hit post api
    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
      .then((success) => {
        alert("Submitted successfully!");
        getAllMedias();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mkv, .mp4"
            onChange={(e) => setVideos(e.target.files)}
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </>
  );
};

export default UploadForm;
