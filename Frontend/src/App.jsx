import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Home from './pages/Home';
import TopicName from "./pages/TopicName";
import DocTypeSize from "./pages/DocTypeSize";
import StrucOfDoc from "./pages/StructOfDoc";
import RulesForDoc from "./pages/RulesForDoc";

function App() {
  const [docData, setDocData] = useState({
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
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/TopicName"
          element={<TopicName docData={docData} setDocData={setDocData} />}
        />
        <Route
          path="/DocTypeSize"
          element={<DocTypeSize docData={docData} setDocData={setDocData} />}
        />
        <Route
          path="/StrucOfDoc"
          element={<StrucOfDoc docData={docData} setDocData={setDocData} />}
        />
        <Route
          path="/RulesForDoc"
          element={<RulesForDoc docData={docData} setDocData={setDocData} />}
        />
      </Routes>
    </Router>
  )
}

export default App