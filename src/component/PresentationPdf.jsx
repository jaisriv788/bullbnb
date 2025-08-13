import pdfSrc from "../assets/icon/pdfIcon.png";
import enPresentationSrc from "../assets/presentation/en/BullBNB-EN-Presentation.pdf";
import PdfDownloadCard from "./PdfDownloadCard";

function PresentationPdf() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-[16px]">
        A comprehensive guide with detailed explanations of BullBNB and its
        programs, available in an easy-to-share PDF presentation in multiple
        languages.
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        <PdfDownloadCard
          pdf={pdfSrc}
          text="Presentation English"
          downloadUrl={enPresentationSrc}
        />
      </div>
    </div>
  );
}

export default PresentationPdf;
