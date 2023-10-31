import React from "react";
import { BACKEND_URI } from "../config/constants";

const UploadList = ({ medias }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="200">Name</th>
                <th>Videos</th>
              </tr>
              <tbody>
                {medias &&
                  medias.map((media) => {
                    return (
                      <tr>
                        <td width="200">{media.name}</td>
                        <td>
                          {media.videos.map((video) => {
                            return (
                              <video
                                preload="auto"
                                width="320"
                                height="240"
                                controls
                              >
                                <source src={`${BACKEND_URI}${video}`} />
                                ;Your browser does not suppport video tag.
                              </video>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};

export default UploadList;
