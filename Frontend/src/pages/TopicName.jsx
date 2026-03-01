import { useState } from "react";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  FlaskConical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopicName({ docData, setDocData }) {
  const Navigate = useNavigate();
  const selectedCategory = docData.categoryOfFile;
  const topic = docData.topicName || "";

  const categories = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      name: "Academic",
      color: "blue",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      name: "Business",
      color: "cyan",
    },
    {
      icon: <FlaskConical className="w-5 h-5" />,
      name: "Research",
      color: "indigo",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      name: "Educational",
      color: "purple",
    },
  ];

  const colorMap = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    cyan: {
      border: "border-cyan-500",
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },
    indigo: {
      border: "border-indigo-500",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  };

  const suggestions = [
    "Climate Change and Its Global Impact",
    "Machine Learning Fundamentals",
    "Marketing Strategy for Startups",
    "Ancient Civilizations: Rome",
    "Renewable Energy Sources",
    "Digital Marketing Trends 2026",
  ];

  const handleSuggestionClick = (suggestion) => {
    setDocData({
      ...docData,
      topicName: suggestion,
    });
  };

  const handleCategory = (categoryName) => {
    setDocData({
      ...docData,
      categoryOfFile: categoryName,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Progress Bar */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              Step 1 of 4
            </span>
            <span className="text-sm text-gray-500">Topic Selection</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "25%" }}
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              What's Your Topic?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us what your presentation or document is about. Be as
              specific or general as you like.
            </p>
          </div>

          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Category (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((categoryOfFile, index) => (
                <button
                  key={index}
                  onClick={() => handleCategory(categoryOfFile.name)}
                  className={`p-4 rounded-xl border-2 transition transform hover:scale-105 ${
                    selectedCategory === categoryOfFile.name
                      ? `${colorMap[categoryOfFile.color].border} ${colorMap[categoryOfFile.color].bg}`
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div
                    className={`flex flex-col items-center space-y-2 ${
                      selectedCategory === categoryOfFile.name
                        ? colorMap[categoryOfFile.color].text
                        : "text-gray-600"
                    }`}
                  >
                    {categoryOfFile.icon}
                    <span className="text-sm font-medium">{categoryOfFile.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div className="mb-8">
            <label
              htmlFor="topic"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Enter Your Topic <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="topic"
                value={docData.topicName}
                onChange={(e) =>
                  setDocData({
                    ...docData,
                    topicName: e.target.value,
                  })
                }
                placeholder="e.g., The Impact of Artificial Intelligence on Healthcare"
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
              {topic && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </div>
              )}
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Additional Details (Optional)
            </label>
            <textarea
              id="description"
              value={docData.focusAreaOfTopic}
              onChange={(e) =>
                setDocData({
                  ...docData,
                  focusAreaOfTopic: e.target.value,
                })
              }
              placeholder="Add any specific focus areas, perspectives, or context you'd like to include..."
              rows="4"
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
            ></textarea>
            <p className="text-sm text-gray-500 mt-2">
              {docData.focusAreaOfTopic?.length || 0}/500 characters
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <label className="text-sm font-semibold text-gray-700">
                Need Inspiration? Try These:
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition border border-blue-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Pro Tip</h3>
                <p className="text-sm text-gray-600">
                  The more specific your topic, the better our AI can generate
                  relevant content. Include key terms or focus areas for best
                  results!
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transition"
              onClick={() => Navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={() => Navigate("/DocTypeSize")}
              disabled={!topic.trim()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition transform ${
                topic.trim()
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
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
          <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <span>Choose size & type</span>
            </li>
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
