import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Project } from "../apis/models/project";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Summary = ({ projects }: { projects: Project[] }) => {
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
            fileUrl={"/CV_M_PARHAN_ID.pdf"}
          />
          <div className="mt-3 d-flex justify-content-center ">
            <a
              className="text-white"
              href={"/CV_M_PARHAN_ID.pdf"}
              target="_blank"
            >
              Download CV
            </a>
          </div>
        </div>
      </Worker>
    </div>
  );
};

export default Summary;
