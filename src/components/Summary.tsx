import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Summary = () => {
  return (
    <div
      style={{
        width: window.innerWidth < 600 ? "100%" : "650px",
        margin: "0 auto",
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div>
          <Viewer fileUrl={"/HANDEV_CV.pdf"} />
        </div>
      </Worker>
    </div>
  );
};

export default Summary;
