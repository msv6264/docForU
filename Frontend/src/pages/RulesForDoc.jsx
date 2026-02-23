import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loadingComp/Loader";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
  X,
  FileCheck,
  AlertCircle,
  Check,
  Zap,
  PlayCircle,
} from "lucide-react";

export default function RulesForDoc({ docData, setDocData }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const updateRulesForDoc = (value) => {
    setDocData((prev) => ({
      ...prev,
      rulesForDoc: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    const validTypes = [".pptx", ".docx", ".pdf"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload file of maximum 10MB");
      return;
    }

    if (!validTypes.includes(fileExtension)) {
      alert("Please upload a .pptx, .docx, or .pdf file");
      return;
    }

    setUploadedFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("data", JSON.stringify(docData));

    try {
      const response = await fetch("http://localhost:5000/receive-data", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from backend: ", data);
    } catch (error) {
      console.log("Error sending data: ", error);
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:5000/generate",
        docData,
      );

      setGeneratedData(response.data);
    } catch (err) {
      console.error(err);
      setError("Generation failed. please try again");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSkipAndGenerate = () => {
    setIsGenerating(true);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        {/* Progress Bar */}
        <div className="bg-white border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">
                Step 4 of 4
              </span>
              <span className="text-sm text-gray-500">Document Structure</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
            {/* Title Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Almost Done! 🎉
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Add your own template or set custom rules (both optional). Or
                skip and let AI handle everything!
              </p>
            </div>

            {/* Optional Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Check className="w-4 h-4" />
                <span>Both sections are completely optional</span>
              </span>
            </div>

            {/* Template Upload Section */}
            <div className="mb-8">
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
                          {uploadedFile.size} MB •{" "}
                          {uploadedFile.type.toUpperCase()}
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

              {/* Template Info */}
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

            {/* Custom Rules Section */}
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
                placeholder="Example rules:
                • Use company colors: #003366 (blue) and #FFB81C (yellow)
                • Include our logo on every slide
                • Keep fonts: Arial for headings, Calibri for body
                • Maximum 5 bullet points per slide
                • Add page numbers
                • Include data sources at bottom of charts"
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
              ></textarea>

              <p className="text-sm text-gray-500 mt-2">
                {docData.rulesForDoc.length}/1000 characters
              </p>

              {/* Rules Examples */}
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
            </div>

            <div className="space-y-4">
                {isGenerating ? (
                  <Loader />
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Zap className="w-6 h-6" />
                    <span>Generate My Document</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                )}

              {/* Skip Button */}
              {!uploadedFile && !docData.rulesForDoc && (
                <button
                  onClick={handleSkipAndGenerate}
                  disabled={isGenerating}
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-300 hover:bg-blue-50 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Skip & Generate with Defaults</span>
                </button>
              )}
            </div>

            {/* Summary Card */}
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
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    You'll be able to preview and edit before downloading
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Download in .pptx or .docx format</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Typically takes 30-60 seconds to generate</span>
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
