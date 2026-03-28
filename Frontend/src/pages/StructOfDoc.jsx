import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Layers,
  CircleAlert,
  Plus,
  GripVertical,
  Minus,
  Trash2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function DocTypeSize() {
  const navigate = useNavigate();
  const [slideCount, setSlideCount] = useState(0); //update from prev section
  const [allocatedSlideCount, setAllocatedSlideCount] = useState(0);
  const [remainingSlides, setRemainingSlides] = useState(0);
  const [status, setStatus] = useState("red");
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [draggedId, setDraggedId] = useState(null); //which item is being dragged

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

  const recommendations = [
    { id: 1, name: "Table of Contents" },
    { id: 2, name: "Background" },
    { id: 3, name: "Methodology" },
    { id: 4, name: "Analysis" },
    { id: 5, name: "Results" },
    { id: 6, name: "Discussion" },
    { id: 7, name: "Recommendations" },
    { id: 8, name: "Q&A" },
    { id: 9, name: "Appendix" },
  ];

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

  const sections = docData.sections || [];

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    if (draggedId === null || draggedId === targetId) return;

    const updated = [...sections];

    const draggedIdx = updated.findIndex((section) => section.id === draggedId);
    const targetIdx = updated.findIndex((section) => section.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const [movedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIdx, 0, movedItem);

    updateSections(updated);
    setDraggedId(null);
  };

  useEffect(() => {
    setSlideCount(docData.noOfSlides || 0);
  }, [docData.noOfSlides, sections]);

  const updateSections = (updatedSections) => {
    setDocData((prev) => ({
      ...prev, //prev === current docData at the moment of update
      sections: updatedSections,
    }));
  };

  const statusColorMap = {
    green: {
      border: "border-green-500",
      text: "text-green-700",
      bg: "bg-green-50",
    },
    red: {
      border: "border-red-500",
      text: "text-red-700",
      bg: "bg-red-50",
    },
    yellow: {
      border: "border-yellow-500",
      text: "text-yellow-700",
      bg: "bg-yellow-50",
    },
  };

  const slideComment = () => {
    if (status === "yellow") {
      return (
        <div className="flex items-start align-middle space-x-2">
          <CircleAlert className="w-5 h-5 mt-[3px]" />
          <span>
            You have {remainingSlides} unallocated slides. Distribute them.
          </span>
        </div>
      );
    }

    if (status === "red") {
      return (
        <div className="flex align-middle justify-center gap-3">
          <CircleAlert className="w-5 h-5 mt-[3px]" />
          <span>
            You've allocated {Math.abs(remainingSlides)} too many slides. Please
            reduce some sections.
          </span>
        </div>
      );
    }
  };

  useEffect(() => {
    const remaining = slideCount - allocatedSlideCount;
    setRemainingSlides(remaining);

    if (remaining === 0) {
      setStatus("green");
      setIsValid(true);
    } else if (remaining > 0) {
      setStatus("yellow");
      setIsValid(false);
    } else {
      setIsValid(false);
      setStatus("red");
    }
  }, [slideCount, allocatedSlideCount]);

  useEffect(() => {
    const allotedSlides = sections.reduce(
      (sum, section) => sum + section.count,
      0,
    );
    setAllocatedSlideCount(allotedSlides);
  }, [sections]);

  const handleDeleteSection = (idx) => {
    updateSections(sections.filter((section) => section.id !== idx));
  };

  const handleIncrement = (id) => {
    updateSections(
      sections.map((section) =>
        section.id === id ? { ...section, count: section.count + 1 } : section,
      ),
    );
  };

  const handleDecrement = (id) => {
    updateSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, count: Math.max(0, section.count - 1) }
          : section,
      ),
    );
  };

  const handleManualChange = (id, value) => {
    if (value < 0) return;

    updateSections(
      sections.map((obj) => (obj.id === id ? { ...obj, count: value } : obj)),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Progress Bar */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              Step 3 of 4
            </span>
            <span className="text-sm text-gray-500">Document Structure</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "75%" }}
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
              Define your structure
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organize your {slideCount} slides into sections. Customize how
              many slides each section should have.
            </p>
          </div>

          <div
            className={`rounded-lg border-2 ${statusColorMap[status].bg} ${statusColorMap[status].border || "border-gray-500"} flex flex-col p-3 pl-5 pr-5`}
          >
            <div className=" flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">
                  Allocation status
                </span>
                <div className="flex gap-2 align-middle ">
                  <span className="text-[35px] font-bold ">
                    {allocatedSlideCount}
                  </span>
                  <span className="mt-5 text-lg text-gray-700">
                    of {slideCount} slides
                  </span>
                </div>
              </div>
              <div className="font-medium flex flex-col">
                <span className="text-gray-700 font-medium">Remaining</span>
                <div
                  className={`${statusColorMap[status].text} text-[35px] font-medium  `}
                >
                  {remainingSlides}
                </div>
              </div>
            </div>
            <div
              className={`${statusColorMap[status].text} m-3 flex items-center gap-2`}
            >
              {slideComment()}
            </div>
          </div>

          {/* drag menu */}
          <section className="flex flex-col mt-5">
            <div className="flex justify-between">
              <div>Document Sections</div>
              <div
                className={`flex gap-1 ${
                  status === "red"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-700 cursor-pointer"
                }`}
                onClick={() => {
                  if (status === "red") return;
                  setShowAddSection(true);
                }}
              >
                <Plus className="font-bold" />
                <span className="font-medium">Add section</span>
              </div>
            </div>

            <div>
              {sections.map((obj, idx) => {
                return (
                  <div
                    key={obj.id}
                    draggable={!obj.locked}
                    onDragStart={() => handleDragStart(obj.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, obj.id)}
                    className="mt-3 border border-gray-200 bg-slate-50 rounded-lg flex justify-between p-3"
                  >
                    <div className="flex gap-3 items-center">
                      <GripVertical
                        className={`${
                          obj.locked
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-400 cursor-grab"
                        }`}
                      />

                      <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 bg-gradient-to-br from-blue-500 to-cyan-500 font-medium text-[16px] text-white rounded-lg">
                        {idx + 1}
                      </span>

                      <div className="flex flex-col leading-tight">
                        <span className="text-[16px] font-medium">
                          {obj.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {obj.count} slides
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div
                        className={`flex items-center justify-center text-[20px] border-2 rounded-md h-8 w-8 ${obj.locked ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 cursor-pointer"}`}
                        onClick={() => !obj.locked && handleDecrement(obj.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </div>

                      <input
                        type="number"
                        value={obj.count}
                        disabled={obj.locked}
                        onChange={(e) =>
                          handleManualChange(obj.id, Number(e.target.value))
                        }
                        className={`bg-white text-center border-2 font-medium rounded-md h-8 w-14 outline-none ${obj.locked ? "border-gray-200 text-gray-400" : "border-gray-300"}`}
                      />

                      <div
                        className={`flex items-center justify-center text-[20px] border-2 rounded-md h-8 w-8${obj.locked ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 cursor-pointer"}`}
                        onClick={() => !obj.locked && handleIncrement(obj.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </div>

                      <button
                        disabled={obj.locked}
                        onClick={() => handleDeleteSection(obj.id)}
                        className={`w-8 h-8 rounded-lg transition flex items-center justify-center ${obj.locked ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:bg-red-50 hover:text-red-600"}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {showAddSection && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Add New Section
                </h3>

                <label className="text-sm text-gray-700 block mb-2">
                  Custom Section Name
                </label>

                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Enter section name..."
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none"
                  />

                  <button
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => {
                      if (!newSectionName.trim()) return;

                      updateSections([
                        ...sections,
                        {
                          id: Date.now(),
                          name: newSectionName,
                          count: 1,
                          locked: false,
                        },
                      ]);

                      setNewSectionName("");
                      setShowAddSection(false);
                    }}
                  >
                    Add
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  Or choose from common sections:
                </p>

                <div className="flex flex-wrap gap-2">
                  {recommendations.map((item) => (
                    <button
                      key={item.id}
                      disabled={sections.some((sec) => sec.name === item.name)}
                      className={`px-3 py-1.5 border rounded-full text-sm 
                      ${
                        sections.some((sec) => sec.name === item.name)
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-blue-300 text-blue-700 hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        updateSections([
                          ...sections,
                          {
                            id: Date.now(),
                            name: item.name,
                            count: 1,
                            locked: false,
                          },
                        ]);

                        setShowAddSection(false);
                      }}
                    >
                      + {item.name}
                    </button>
                  ))}
                </div>

                <div className="text-right mt-4">
                  <button
                    className="text-sm text-gray-500 hover:text-red-500"
                    onClick={() => setShowAddSection(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Tips Card */}
          <div className="bg-gradient-to-r mt-10 from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pro Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drag sections to reorder them</li>
                  <li>• You can always adjust counts later</li>
                  <li>
                    • Title and key sections are recommended for all documents
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-white hover:bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transition"
              onClick={() => navigate("../DocTypeSize")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={() => navigate("../RulesForDoc")}
              disabled={!isValid}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition transform ${
                isValid
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Side Info Panel */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 w-64">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-4">Coming Up Next</h3>
          <ul className="space-y-3 text-sm text-gray-600">
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
