import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Zap,
  Download,
  RefreshCw,
  CheckCircle2,
  FileText,
  Presentation,
  AlertTriangle,
} from "lucide-react";
import { generateDoc } from "../api/docApi";
import { useDoc } from "../../context/docContext";

const GEN_STEPS = [
  "Analyzing your settings…",
  "Writing content…",
  "Applying layout & design…",
  "Finalizing document…",
];

export default function RulesForDoc() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [genFailed, setGenFailed] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [genTime, setGenTime] = useState(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const [error, setError] = useState(null);

  const { docData, setDocData } = useDoc();

  const Navigate = useNavigate();

  const handleFileUpload = (file) => {
    const validTypes = [".pptx", ".docx", ".pdf"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload file of maximum 10MB");
      return;
    }
    if (!validTypes.includes(ext)) {
      alert("Please upload a .pptx, .docx, or .pdf file");
      return;
    }
    setUploadedFile(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) handleFileUpload(e.target.files[0]);
  };

  const removeFile = () => setUploadedFile(null);

  const startProgressAnimation = () => {
    let pct = 0;
    let step = 0;
    setProgress(0);
    setGenStep(0);
    clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      pct = Math.min(pct + Math.random() * 3.5 + 0.5, 92);
      setProgress(Math.round(pct));
      const newStep = Math.min(Math.floor(pct / 25), 3);
      if (newStep !== step) {
        step = newStep;
        setGenStep(newStep);
      }
    }, 250);
  };

  const handleGenerate = async () => {
    const formData = new FormData();
    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }
    formData.append("docData", JSON.stringify(docData));
    setIsGenerating(true);
    setGenFailed(false);
    setError(null);
    setGeneratedData(null);
    setGenTime(null);
    startTimeRef.current = Date.now();
    startProgressAnimation();

    try {
      const blob = await generateDoc(formData);

      clearInterval(progressRef.current);
      setProgress(100);

      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);

      setTimeout(() => {
        setGeneratedData(blob);
        setIsGenerating(false);
        setGenTime(elapsed);
      }, 400);

    } catch (err) {
      clearInterval(progressRef.current);
      setIsGenerating(false);
      setGenFailed(true);
      console.error("Error:", err);
    }
  };

  const downloadDoc = () => {
    if (!generatedData) return;
    const url = window.URL.createObjectURL(generatedData);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      docData.docType === "document"
        ? `${docData.topicName || "document"}.docx`
        : `${docData.topicName || "presentation"}.pptx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const resetGeneration = () => {
    setGeneratedData(null);
    setGenFailed(false);
    setProgress(0);
    setGenTime(null);
  };

  const fileExt = docData.docType === "document" ? "docx" : "pptx";
  const fileName = `${docData.topicName || "My Document"}.${fileExt}`;
  const FileIcon = docData.docType === "document" ? FileText : Presentation;

  return (
    <div>
      <style>{`
        @keyframes rfd-spin { to { transform: rotate(360deg); } }
        @keyframes rfd-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rfd-fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rfd-scaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Generating box */
        .rfd-gen-box {
          background: white; border-radius: 16px;
          border: 1px solid #dbeafe; padding: 24px 28px;
          animation: rfd-scaleIn 0.3s ease;
        }
        .rfd-gen-top {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .rfd-gen-spinner {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2.5px solid #bfdbfe; border-top-color: #3b82f6;
          animation: rfd-spin 0.7s linear infinite; flex-shrink: 0;
        }
        .rfd-gen-step-text { font-size: 14px; font-weight: 500; color: #1e3a5f; flex: 1; }
        .rfd-gen-pct { font-size: 13px; color: #3b82f6; font-weight: 600; }
        .rfd-track {
          height: 6px; background: #dbeafe;
          border-radius: 99px; overflow: hidden; margin-bottom: 14px;
        }
        .rfd-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          background-size: 200% 100%;
          animation: rfd-shimmer 1.5s linear infinite;
          transition: width 0.35s ease;
        }
        .rfd-dots-row {
          display: flex; border-top: 1px solid #eff6ff; padding-top: 14px;
        }
        .rfd-dot-step {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; gap: 5px;
          font-size: 10px; color: #bfdbfe;
          transition: color 0.3s; text-align: center;
        }
        .rfd-dot-step.active { color: #3b82f6; }
        .rfd-dot-step.done { color: #22c55e; }
        .rfd-dot-pip { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

        /* Success box */
        .rfd-success-box {
          border-radius: 16px; overflow: hidden;
          border: 1px solid #bfdbfe;
          animation: rfd-scaleIn 0.35s ease;
        }
        .rfd-success-top {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          padding: 20px 24px; display: flex; align-items: center; gap: 14px;
        }
        .rfd-success-check {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rfd-success-title { font-size: 16px; font-weight: 700; color: white; margin: 0 0 2px; }
        .rfd-success-sub { font-size: 12px; color: rgba(255,255,255,0.75); margin: 0; }
        .rfd-success-body { background: white; padding: 20px 24px; }
        .rfd-file-row {
          display: flex; align-items: center; gap: 12px;
          background: #eff6ff; border: 1px solid #bfdbfe;
          border-radius: 12px; padding: 14px 16px; margin-bottom: 14px;
        }
        .rfd-file-icon-box {
          width: 40px; height: 40px; border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rfd-file-name { font-size: 14px; font-weight: 600; color: #1e3a5f; }
        .rfd-file-meta { font-size: 12px; color: #60a5fa; margin-top: 2px; }
        .rfd-dl-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 8px; padding: 14px;
          border: none; border-radius: 12px;
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          color: white; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: opacity 0.15s, transform 0.1s;
          margin-bottom: 10px;
        }
        .rfd-dl-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .rfd-gen-again-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 7px; padding: 11px;
          border: 1px solid #bfdbfe; border-radius: 10px;
          background: white; color: #3b82f6;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: background 0.15s;
        }
        .rfd-gen-again-btn:hover { background: #eff6ff; }

        /* Error box */
        .rfd-error-box {
          background: #fef2f2; border: 1px solid #fca5a5;
          border-radius: 16px; padding: 20px 24px;
          display: flex; gap: 14px;
          animation: rfd-fadeUp 0.3s ease;
        }
        .rfd-error-icon-box {
          width: 36px; height: 36px; background: #fee2e2;
          border-radius: 50%; display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rfd-error-title { font-size: 14px; font-weight: 600; color: #991b1b; margin: 0 0 4px; }
        .rfd-error-desc { font-size: 13px; color: #b91c1c; margin: 0 0 12px; line-height: 1.5; }
        .rfd-retry-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border: 1.5px solid #fca5a5;
          border-radius: 8px; background: white; color: #dc2626;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: background 0.15s;
        }
        .rfd-retry-btn:hover { background: #fee2e2; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        {/* Progress Bar — unchanged */}
        <div className="bg-white border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">
                Step 4 of 4
              </span>
              <span className="text-sm text-gray-500">Document Generation</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Main Content — unchanged */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                You will get your document now! 🎉
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {/* Add your own template or set custom rules (both optional). Or
                skip and let AI handle everything! */}
              </p>
            </div>

            {/* <div className="flex justify-center mb-8">
              <span className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Check className="w-4 h-4" />
                <span>Both sections are completely optional</span>
              </span>
            </div> */}

            {/* <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Upload Your Template
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Have a specific format? Upload your .pptx or .docx template
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  Optional
                </span>
              </div>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400 bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        Drag & drop your file here
                      </p>
                      <p className="text-sm text-gray-500">or</p>
                    </div>
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                        <Upload className="w-5 h-5" />
                        <span>Browse Files</span>
                      </span>
                      <input
                        type="file"
                        accept=".pptx,.docx,.pdf"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500">
                      Supports: .pptx, .docx, .pdf (Max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-green-200 bg-green-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {uploadedFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="w-8 h-8 rounded-lg hover:bg-red-100 transition flex items-center justify-center text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium text-gray-900 mb-1">
                      How templates work:
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li>
                        • AI will match your template's style, colors, and
                        layout
                      </li>
                      <li>
                        • Your content structure from Step 3 will be preserved
                      </li>
                      <li>• Works best with clean, well-formatted templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Custom Rules & Guidelines
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Any specific requirements or constraints?
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  Optional
                </span>
              </div>
              <textarea
                value={docData.rulesForDoc}
                onChange={(e) => updateRulesForDoc(e.target.value)}
                placeholder={`Example rules:\n• Use company colors: #003366 (blue) and #FFB81C (yellow)\n• Include our logo on every slide\n• Keep fonts: Arial for headings, Calibri for body\n• Maximum 5 bullet points per slide\n• Add page numbers\n• Include data sources at bottom of charts`}
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
              />
              <p className="text-sm text-gray-500 mt-2">
                {docData.rulesForDoc.length}/1000 characters
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Quick examples to copy:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Use APA citation format",
                    "Add sources at the end",
                    "Keep language simple",
                    "Include page numbers",
                    "Use corporate branding",
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        updateRulesForDoc(
                          docData.rulesForDoc +
                            (docData.rulesForDoc ? "\n" : "") +
                            "• " +
                            example,
                        )
                      }
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition"
                    >
                      + {example}
                    </button>
                  ))}
                </div>
              </div>
            </div> */}


            {/* State: idle */}
            {!isGenerating && !generatedData && !genFailed && (
              <div className="space-y-4">
                <button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <Zap className="w-6 h-6" />
                  <span>Generate My Document</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* State: generating */}
            {isGenerating && (
              <div className="rfd-gen-box">
                <div className="rfd-gen-top">
                  <div className="rfd-gen-spinner" />
                  <span className="rfd-gen-step-text">
                    {GEN_STEPS[genStep]}
                  </span>
                  <span className="rfd-gen-pct">{progress}%</span>
                </div>
                <div className="rfd-track">
                  <div className="rfd-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="rfd-dots-row">
                  {GEN_STEPS.map((label, i) => (
                    <div
                      key={i}
                      className={`rfd-dot-step${i === genStep ? " active" : i < genStep ? " done" : ""}`}
                    >
                      <div className="rfd-dot-pip" />
                      {label.replace("…", "")}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* State: success */}
            {generatedData && !isGenerating && (
              <div className="rfd-success-box">
                <div className="rfd-success-top">
                  <div className="rfd-success-check">
                    <CheckCircle2 size={22} color="white" />
                  </div>
                  <div>
                    <p className="rfd-success-title">Document ready!</p>
                    <p className="rfd-success-sub">
                      Generated in {genTime}s · ready to download
                    </p>
                  </div>
                </div>
                <div className="rfd-success-body">
                  <div className="rfd-file-row">
                    <div className="rfd-file-icon-box">
                      <FileIcon size={20} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="rfd-file-name">{fileName}</div>
                      <div className="rfd-file-meta">
                        {docData.noOfSlides
                          ? `${docData.noOfSlides} slides · `
                          : ""}
                        {fileExt.toUpperCase()} file
                      </div>
                    </div>
                  </div>
                  <button className="rfd-dl-btn" onClick={downloadDoc}>
                    <Download size={18} />
                    Download {fileExt.toUpperCase()}
                  </button>
                  <button
                    className="rfd-gen-again-btn"
                    onClick={resetGeneration}
                  >
                    <RefreshCw size={14} />
                    Generate again
                  </button>
                </div>
              </div>
            )}

            {/* State: error */}
            {genFailed && !isGenerating && (
              <div className="rfd-error-box">
                <div className="rfd-error-icon-box">
                  <AlertTriangle size={18} color="#ef4444" />
                </div>
                <div>
                  <p className="rfd-error-title">Generation failed</p>
                  <p className="rfd-error-desc">
                    The server couldn't be reached. Check your connection and
                    try again.
                  </p>
                  <button className="rfd-retry-btn" onClick={handleGenerate}>
                    <RefreshCw size={13} />
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Summary Card — unchanged */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                What happens next?
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    AI will generate your document based on all your preferences
                  </span>
                </div>
                {/* <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    You'll be able to preview and edit before downloading
                  </span>
                </div> */}
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Download in .pptx or .docx format</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Typically takes 5–10 seconds to generate</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transition"
                onClick={() => Navigate("../StrucOfDoc")}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
