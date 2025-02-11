import Slider from "react-slick";
import { techStacks } from "../common/techstack";

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
        <div className="col-lg-6" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-globe mx-2"></i>
          Frontend Development
        </div>
        <div className="col-lg-6" style={{ fontSize: "20px" }}>
          <i className="fa-solid fa-globe mx-2"></i>
          Backend Development
        </div>
        <div className="col-12 mb-4 mt-5">
          <h3>TechStack</h3>
        </div>
        <div className="slider-container mb-3">
          <Slider {...settings}>
            {techStacks.map((item) => (
              <div className="flex flex-col items-center">
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={item.image}
                  alt={item.name}
                  className="mx-auto"
                />
                <p className="mt-2 text-sm text-gray-700">{item.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Skills;
