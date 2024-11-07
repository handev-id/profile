import Slider from "react-slick";

const Skills = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow:
      window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 5 : 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    draggable: true,
  };
  return (
    <div className="container">
      <div
        className="row text-center py-3 rounded"
        style={{ backgroundColor: "#262a33" }}
      >
        <div className="col-12 mb-4">
          <h2>Skills</h2>
        </div>
        <div className="col-lg-3" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-globe mx-2"></i>
          Frontend Development
        </div>
        <div className="col-lg-3" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-globe mx-2"></i>
          Backend Development
        </div>
        <div className="col-lg-3" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-mobile-screen-button mx-2"></i>
          Mobile Development
        </div>
        <div className="col-lg-3" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-server mx-2"></i>
          Deployment
        </div>
        <div className="col-12 mb-4 mt-5">
          <h3>TechStack</h3>
        </div>
        <div className="slider-container mb-3">
          <Slider {...settings}>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/1.webp"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/2.webp"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/4.webp"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/5.webp"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/6.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/7.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/9.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/10.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/11.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/12.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/15.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/16.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/18.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/20.png"
                alt=""
                className="mx-auto"
              />
            </div>
            <div>
              <img
                style={{ width: "70px", height: "70px" }}
                src="/techstack/21.png"
                alt=""
                className="mx-auto"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Skills;
