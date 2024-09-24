import React from "react";
import Slider from "react-slick";

const Portofolio = () => {
  const [slide, setSlide] = React.useState(1);
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
        {/* <div className="col-12 mb-4">
          <h2>Portofolio</h2>
        </div> */}
        <div
          className="slider-container mb-3 mx-auto"
          style={{ width: window.innerWidth < 1024 ? "100%" : "50%" }}
        >
          {slide === 1 ? (
            <Slider {...settings}>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap1.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap2.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap3.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap4.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap5.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap6.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap7.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap8.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap9.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap10.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap01.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap02.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={{ width: "100%", objectFit: "contain" }}
                  src="/caqap/caqap03.png"
                  alt=""
                />
              </div>
            </Slider>
          ) : null}
        </div>
        <div className="col-12">
          <img
            onClick={() => setSlide(1)}
            className="mx-1 border"
            src="/caqap/caqap1.png"
            alt=""
            style={{ width: "100px" }}
          />
          <img
            className="mx-1 border"
            src="/fashiotrendz/fashio1.png"
            alt=""
            style={{ width: "100px" }}
          />
          <img
            className="mx-1 border"
            src="/threads/threads1.png"
            alt=""
            style={{ width: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
