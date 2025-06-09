import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Project } from "../apis/models/project";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Summary = ({ projects }: { projects: Project[] }) => {
  console.log(
    `${import.meta.env.VITE_BACKEND_URL}/storage/projects/`.replace(
      "/api",
      ""
    ) + projects.find((p) => p.title === "cv")?.images[0]
  );
  return (
    <div
      style={{
        width: window.innerWidth < 600 ? "100%" : "650px",
        margin: "0 auto",
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div>
          <Viewer
            fileUrl={
              `${import.meta.env.VITE_BACKEND_URL}/storage/projects/`.replace(
                "/api",
                ""
              ) + projects.find((p) => p.title === "cv")?.images[0] ||
              "/HANDEV_CV.pdf"
            }
          />
        </div>
      </Worker>
    </div>
  );
};

export default Summary;
