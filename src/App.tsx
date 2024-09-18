const App = () => {
  return (
    <section className="home" id="home">
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <img
              src="/z-profile.jpeg"
              alt="handev"
              className="rounded-circle"
            />
            <h2 className="fw-bold mt-3">
              M Parhan Maulana - Fullstack Developer
            </h2>
            <p>
              Enjoy learning new things, committed to assigned tasks, and
              adaptable.
            </p>
            <div className="app mb-3">
              <a href="https://www.instagram.com/han.dev_/">
                <i className="fa-brands fa-instagram mx-2 fs-5"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100041689061994">
                <i className="fa-brands fa-facebook mx-2 fs-5"></i>
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
      </div>
    </section>
  );
};

export default App;
