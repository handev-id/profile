import { linkShowApi } from "../apis/endpoints/links";
import { useEffect } from "react";
import useApi from "../apis/api";
import mybg from "../assets/my-bg.png";
import { IoArrowRedo } from "react-icons/io5";

const Links = () => {
  const linkIndex = useApi({
    api: linkShowApi,
  });

  useEffect(() => {
    linkIndex.process({});
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${mybg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-image"
    >
      <div
        className="position-relative w-100"
        style={{
          borderRadius: "16px",
          minHeight: "100vh",
          background: "rgba(255, 255, 255, 0.3)", // transparan putih
          backdropFilter: "blur(5px)", // blur efek
          WebkitBackdropFilter: "blur(5px)", // untuk Safari
          padding: "1rem 0",
        }}
      >
        <div className="text-center py-4">
          <h4 style={{ fontWeight: 600 }}>🌐 My Link</h4>
        </div>

        <div
          className="w-100 px-3"
          style={{ maxHeight: "75vh", overflowY: "auto" }}
        >
          {linkIndex.data?.map((link, i) => (
            <div
            onClick={() => window.open(link.link, '_blank')}
              key={i}
              className="d-flex position-relative align-items-center cursor-pointer justify-content-between shadow-sm bg-white p-3 mb-3 rounded-4 link-card hover-scale"
              style={{
                transition: "all 0.2s ease-in-out",
                border: "1px solid #eaeaea",
              }}
            >
              <div className="d-flex text-black align-items-center gap-3">
                <img
                  src={
                    `${import.meta.env.VITE_BACKEND_URL}`.replace("/api", "") +
                    "/storage/icons/" +
                    link.icon
                  }
                  alt="icon"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
                <div>
                  <h6 style={{ margin: 0 }}>{link.title}</h6>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#888",
                      maxWidth: "250px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {link.description}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    right: "20px",
                    fontSize: '22px',
                    color: 'skyblue'
                  }}
                >
                  <IoArrowRedo />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
