import { Download } from "lucide-react";

function PdfDownloadCard({ pdf, text, downloadUrl }) {
  return (
    <div className="py-8 relative rounded-t-3xl flex flex-col items-center gap-5 bg-gradient-to-b from-[#f0b03d59] to-transparent flex-1 max-w-3/4 lg:max-w-1/2 text-center min-w-[350px]">
      <img className="h-12 absolute -top-6" src={pdf} />
      <div className="text-xl">{text}</div>
      <div className="btn-theme gap-2 justify-center items-center cursor-pointer">
        <Download size={18} />
        <a href={downloadUrl} target="_blank">
          Download
        </a>
      </div>
    </div>
  );
}

export default PdfDownloadCard;
