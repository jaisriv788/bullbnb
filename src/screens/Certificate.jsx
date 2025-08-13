import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import certi from "../assets/certificate/certificate.jpg";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";

function Certificate() {
  const { name, rank, earning } = useParams();
  const certificateRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (certificateRef.current) {
        domtoimage
          .toPng(certificateRef.current)
          .then((dataUrl) => {
            const pdf = new jsPDF("landscape", "mm", "a4");
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${name}_certificate.pdf`);
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <div className="bg-white flex items-center justify-center text-black absolute w-full h-full z-0">
      <div className="relative" ref={certificateRef}>
        <img src={certi} alt="Certificate" className="max-h-screen" />

        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 text-[#9E1903] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap outline-none border-none select-none">
          {name}
        </div>

        <div className="absolute top-[65%] left-[30%] text-[#9E1903] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap outline-none border-none select-none">
          {rank}
        </div>

        <div className="absolute top-[65%] right-[26%] text-[#9E1903] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap outline-none border-none select-none">
          {earning} BNB
        </div>
      </div>
    </div>
  );
}

export default Certificate;
