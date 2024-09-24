import React from "react";

const Profile = () => {
  return (
    <div className="row profile text-center">
      <div className="col-12">
        <img
          src="/z-profile.jpeg"
          alt="handev"
          className="rounded-circle mx-auto"
        />
        <h2 className="fw-bold mt-3">M Parhan Maulana - Fullstack Developer</h2>
        <p>
          Enjoy learning new things, committed to assigned tasks, and adaptable.
        </p>
        <div className="app mb-3">
          <a href="https://www.linkedin.com/in/muhamad-parhan-maulana-231a6122a/">
            <i className="fa-brands fa-linkedin mx-2 fs-5"></i>
          </a>
          <a href="https://github.com/handev-id">
            <i className="fa-brands fa-github mx-2 fs-5"></i>
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6283836319218&text&type=phone_number&app_absent=0">
            <i className="fa-brands fa-whatsapp mx-2 fs-5"></i>
          </a>
        </div>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send/?phone=6283836319218&text&type=phone_number&app_absent=0"
        >
          <div className="btn fw-bold">Contact Me</div>
        </a>
      </div>
    </div>
  );
};

export default Profile;
