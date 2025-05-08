import React from "react";

export default function Banner() {
  return (
    <div className="banner d-flex align-items-center">
      <div className="overlay"></div>
      <div className="container content">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            
            <h1 className="display-3 fw-bold">
              <span className="text-primary-color">Entertainment</span>,<br />
              Movies, TVs Shows, &<br />
              More.
            </h1>
            
            <div className="d-flex justify-content-center gap-3 mt-4 mb-5">
              <span className="badge bg-dark">Movie</span>
              <span className="badge bg-primary-color text-dark custom-btn">HD</span>
              <span className="text-white">Action, Drama</span>
              <span className="text-white">2023</span>
            </div>
            
            <div className="mt-4">
              <button className="btn btn-primary-color btn-lg px-5 py-2 rounded-pill fw-bold custom-btn">
                PLAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}