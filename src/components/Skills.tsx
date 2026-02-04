import { techStacks } from "../common/techstack";

const Skills = () => {
  return (
    <div className="container">
      <div
        className="row text-center py-4 rounded"
        style={{ backgroundColor: "#262a33", color: "#fff" }}
      >
        <div className="col-12 mb-4">
          <h2 style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
            Tools & Technologies
          </h2>
        </div>
        <div
          className="d-flex flex-wrap justify-content-center gap-4"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          {techStacks.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "120px",
                padding: "15px",
                borderRadius: "12px",
                backgroundColor: "#2f343f",
                transition: "transform 0.2s ease, background-color 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3a3f4b")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2f343f")
              }
            >
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
                src={item.image}
                alt={item.name}
              />
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "0.9rem",
                  color: "#ccc",
                }}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
