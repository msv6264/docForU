import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Presentation,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Plus,
  Minus,
} from "lucide-react";

export default function DocTypeSize() {
  const [customCount, setCustomCount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const navigate = useNavigate();

  const defaultDocData = {
    topicName: "",
    focusAreaOfTopic: "",
    docType: "",
    noOfSlides: "",
    sections: [
      { id: 1, name: "Title Slide", count: 1, locked: true },
      { id: 2, name: "Introduction", count: 1, locked: false },
      { id: 3, name: "Main Content", count: 1, locked: false },
      { id: 4, name: "Conclusion", count: 1, locked: false },
      { id: 5, name: "References", count: 1, locked: false },
    ],
    rulesForDoc: "",
  };

  const [docData, setDocData] = useState(() => {
    const storedData = localStorage.getItem("docData");

    if (!storedData) return defaultDocData;

    const parsed = JSON.parse(storedData);

    return {
      ...defaultDocData,
      ...parsed,
      sections: parsed.sections?.length
        ? parsed.sections
        : defaultDocData.sections,
    };
  });

  useEffect(() => {
    localStorage.setItem("docData", JSON.stringify(docData));
  }, [docData]);

  const slideCount = docData.noOfSlides || 10;
  const documentType = docData.docType || "presentation";

  const colorMap = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
      softBg: "bg-blue-100",
    },
  };

  const documentTypes = [
    {
      id: "presentation",
      name: "Presentation",
      icon: <Presentation className="w-6 h-6" />,
      description: "PowerPoint slides",
      unit: "slides",
      color: "blue",
      recommended: [5, 10, 15, 20, 25, 30],
    },
    {
      id: "document",
      name: "Document",
      icon: <FileText className="w-6 h-6" />,
      description: "Word document",
      unit: "pages",
      color: "green",
      recommended: [3, 5, 8, 10, 15, 20],
    },
  ];

  const currentDocType = documentTypes.find((type) => type.id === documentType);
  const unitName = currentDocType?.unit || "slides";

  const presetCounts = currentDocType?.recommended || [5, 10, 15, 20, 25, 30];

  const handleIncrement = () => {
    if (slideCount < 30) {
      setDocData({
        ...docData,
        noOfSlides: slideCount + 1,
      });
      setShowCustomInput(false);
    }
  };

  const handleDecrement = () => {
    if (slideCount > 1) {
      setDocData({
        ...docData,
        noOfSlides: slideCount - 1,
      });
      setShowCustomInput(false);
    }
  };

  const handlePresetClick = (count) => {
    setDocData({
      ...docData,
      noOfSlides: count,
    });
    setShowCustomInput(false);
  };

  const handleCustomSubmit = () => {
    const count = parseInt(customCount);
    if (count >= 1 && count <= 30) {
      setDocData({
        ...docData,
        noOfSlides: count,
      });
      setShowCustomInput(false);
      setCustomCount("");
    }
  };

  const getRecommendation = () => {
    if (slideCount <= 5) return "Quick overview";
    if (slideCount <= 10) return "Standard length";
    if (slideCount <= 20) return "Detailed presentation";
    if (slideCount <= 30) return "Comprehensive";
    return "Extensive material";
  };

  const sendingSlideCount = () => {
    navigate("/StrucOfDoc", {
      state: {
        cnt: slideCount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Progress Bar */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              Step 2 of 4
            </span>
            <span className="text-sm text-gray-500">
              Document Specifications
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
          {/* Title Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Document Type & Size
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your document type and specify how many {unitName} you
              need.
            </p>
          </div>

          {/* Document Type Selection */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Select Document Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() =>
                    setDocData({
                      ...docData,
                      docType: type.id,
                    })
                  }
                  className={`p-5 rounded-xl border-2 transition transform hover:scale-105 ${
                    documentType === type.id
                      ? `${colorMap.blue.border} ${colorMap.blue.bg} shadow-md`
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div
                    className={`flex flex-col items-center space-y-3 ${
                      documentType === type.id
  ? colorMap.blue.text
                        : "text-gray-600"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        documentType === type.id
  ? colorMap.blue.softBg
                          : "bg-gray-100"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{type.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Slide/Page Counter */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Number of {unitName.charAt(0).toUpperCase() + unitName.slice(1)}{" "}
              <span className="text-red-500">*</span>
            </label>

            {/* Large Counter Display */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-6 border-2 border-blue-200">
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={handleDecrement}
                  className="w-14 h-14 rounded-full bg-white border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center text-blue-600 hover:text-blue-700"
                >
                  <Minus className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {slideCount}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 font-medium">
                    {unitName}
                  </div>
                </div>

                <button
                  onClick={handleIncrement}
                  className="w-14 h-14 rounded-full bg-white border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center mt-4">
                <span className="inline-flex items-center space-x-1 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-blue-200">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>{getRecommendation()}</span>
                </span>
              </div>
            </div>

            {/* Preset Options */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Quick Select:
              </p>
              <div className="flex flex-wrap gap-3">
                {presetCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => handlePresetClick(count)}
                    className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                      slideCount === count
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {count} {unitName}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Toggle */}
            <div>
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enter custom number</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={customCount}
                    onChange={(e) => setCustomCount(e.target.value)}
                    placeholder={`Enter 1-30 ${unitName}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleCustomSubmit}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomCount("");
                    }}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Recommended Range
                  </h3>
                  <p className="text-sm text-gray-600">
                    For {currentDocType?.name.toLowerCase()}s, we recommend{" "}
                    {presetCounts[1]}-{presetCounts[3]} {unitName}{" "}
                    for optimal content depth and audience engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 rounded-xl p-5 border border-cyan-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Flexible Structure
                  </h3>
                  <p className="text-sm text-gray-600">
                    Don't worry, you'll be able to define exactly how these{" "}
                    {unitName} are distributed across sections in the next step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 mb-8 text-white">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Your Selection</span>
            </h3>
            <div className="space-y-1 text-blue-50">
              <p>
                Document Type:{" "}
                <span className="font-semibold text-white">
                  {currentDocType?.name}
                </span>
              </p>
              <p>
                Total {unitName.charAt(0).toUpperCase() + unitName.slice(1)}:{" "}
                <span className="font-semibold text-white">{slideCount}</span>
              </p>
              <p>
                Status:{" "}
                <span className="font-semibold text-white">
                  {getRecommendation()}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transition"
              onClick={() => navigate("../TopicName")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={sendingSlideCount}
              className="flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg transition transform hover:scale-105"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </main>

      {/* Side Info Panel */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 w-64">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-4">Coming Up Next</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <span>Define structure</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">4</span>
              </div>
              <span>Customize & Generate</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
