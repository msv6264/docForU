import { useState, useEffect, createContext, useContext } from "react";

const DocContext = createContext();

export const DocProvider = ({ children }) => {

  const defaultDocData = {
    topicName: "",
    focusAreaOfTopic: "",
    docType: "",
    noOfSlides: "",
    sections: [
      { id: 1, name: "Introduction", count: 1, locked: true },
      { id: 2, name: "Main Content", count: 1, locked: false },
      { id: 3, name: "Conclusion", count: 1, locked: false },
      { id: 4, name: "References", count: 1, locked: false },
      { id: 5, name: "Q&A", count: 1, locked: false },
    ],
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

  return (
    <DocContext.Provider value={{ docData, setDocData }}>
      {children}
    </DocContext.Provider>
  );
};

export const useDoc = () => useContext(DocContext);