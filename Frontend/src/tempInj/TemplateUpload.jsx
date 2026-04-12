import { Upload, FileCheck, AlertCircle, ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TemplateUpload() {
  const Navigate = useNavigate();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileSave = async () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Template sent successfully !!");
      } else {
        console.log("Failed to send template");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
          {/* Title Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {/* TO-DO: change the heading to Upload or select template */}
              Upload Your Template
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {/* TO-DO: change the sentence to select existing templates. */}
              Have a specific format? Upload your .pptx or .docx template, AI
              will fill it for you
            </p>
          </div>

          <div className="mb-8">
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
                      • AI will match your template's style, colors, and layout
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

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transition"
              onClick={() => Navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={handleFileSave}
              disabled={!uploadedFile}
              className="px-6 py-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full disabled:opacity-50"
            >
              Generate file
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
