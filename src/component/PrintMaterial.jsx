import pdfSrc from "../assets/icon/pdfIcon.png";
import treeSheetSrc from "../assets/print-materials/tree-sheet.pdf";
import PdfDownloadCard from "./PdfDownloadCard";

function PrintMaterial() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-[16px]">
        Downloading the Print Materials PDF is one of the most effective ways to
        stay organized and lead your team with confidence.
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <PdfDownloadCard
          pdf={pdfSrc}
          text="My Tree Sheet"
          downloadUrl={treeSheetSrc}
        />
        <PdfDownloadCard
          pdf={pdfSrc}
          text="One Pager Plan"
          downloadUrl={treeSheetSrc}
        />
      </div>
    </div>
  );
}

export default PrintMaterial;
