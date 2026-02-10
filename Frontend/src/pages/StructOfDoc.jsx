import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, CircleAlert, Plus, GripVertical  } from "lucide-react";

export default function DocTypeSize() {
  const [slideCount, setSlideCount] = useState(10); //update from prev section
  const [allocatedSlideCount, setAllocatedSlideCount] = useState(0);
  const [remainingSlides, setRemainingSlides] = useState(2);
  const [status, setStatus] = useState("red");
  const [secnStatus, setsecnStatus] = useState(0);

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
            You have {remainingSlides} unallocated slides. Distribute them or
            use auto-distribute.
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
    } else if (remaining > 0) {
      setStatus("yellow");
    } else {
      setStatus("red");
    }
  }, [slideCount, allocatedSlideCount]);

  const [sections, setSections] = useState([
    { id: 1, name: "Title Slide", count: 1, locked: true },
    { id: 2, name: "Introduction", count: 2, locked: false },
    { id: 3, name: "Main Content", count: 8, locked: false },
    { id: 4, name: "Conclusion", count: 2, locked: false },
    { id: 5, name: "References", count: 1, locked: false },
  ]);

  useEffect(() => {
    const allotedSlides = sections.reduce(
      (sum, section) => sum + section.count,
      0,
    );
    setAllocatedSlideCount(allotedSlides);
  }, [sections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Progress Bar */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              Step 3 of 5
            </span>
            <span className="text-sm text-gray-500">Document Structure</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "60%" }}
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
                  <span className="text-[35px] font-medium font-archivo ">
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
                  className={`${statusColorMap[status].text} text-[35px] font-medium font-archivo`}
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
              <div className="flex gap-1 text-blue-700 cursor-pointer">
                <Plus className="font-bold" />
                <span className="font-medium">Add section</span>
              </div>
            </div>

            <div>
              
            </div>

            <div></div>
          </section>
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
              <span>Set sections & format</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">5</span>
              </div>
              <span>Upload templates & rules</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
