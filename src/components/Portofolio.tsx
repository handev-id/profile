import Slider from "react-slick";
import { Project } from "../apis/models/project";
import { useState } from "react";

const Portofolio = ({ projects }: { projects: Project[] }) => {
  const [slide, setSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="row text-center rounded">
        <div
          className="slider-container mb-3 mx-auto"
          style={{ width: window.innerWidth < 1024 ? "100%" : "50%" }}
        >
          <Slider {...settings}>
            {projects?.[slide]?.images?.map((image) => (
              <div key={image as string}>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src={
                    `${
                      import.meta.env.VITE_BACKEND_URL
                    }/storage/projects/`.replace("/api", "") + image
                  }
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-12 text-center mb-3">
          <h4>{projects?.[slide]?.title}</h4>
          <a
            style={{ fontSize: "16px" }}
            target="_blank"
            href={projects?.[slide]?.link}
            className="btn fw-bold"
          >
            Demo {"=>"}{" "}
          </a>
        </div>
        <div className="col-12">
          {projects.map((project, index) => (
            <img
              key={index}
              onClick={() => setSlide(index)}
              className="mx-1 border"
              src={
                `${import.meta.env.VITE_BACKEND_URL}/storage/projects/`.replace(
                  "/api",
                  ""
                ) + project.images[0]
              }
              style={{ width: "100px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
