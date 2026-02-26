import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";

const Summary = () => {
  const [width, setWidth] = useState(650);

  useEffect(() => {
    setWidth(window.innerWidth < 600 ? window.innerWidth : 650);
  }, []);

  return (
    <div style={{ width, margin: "0 auto" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <>
          <Viewer fileUrl="/CV_M_PARHAN_ID.pdf" />
          <div className="mt-3 d-flex justify-content-center">
            <a
              className="text-white"
              href="/CV_M_PARHAN_ID.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </>
      </Worker>
    </div>
  );
};

export default Summary;
