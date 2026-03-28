import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Home from './pages/Home';
import TopicName from "./pages/TopicName";
import DocTypeSize from "./pages/DocTypeSize";
import StrucOfDoc from "./pages/StructOfDoc";
import RulesForDoc from "./pages/RulesForDoc";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/TopicName"
          element={<TopicName />}
        />
        <Route
          path="/DocTypeSize"
          element={<DocTypeSize />}
        />
        <Route
          path="/StrucOfDoc"
          element={<StrucOfDoc />}
        />
        <Route
          path="/RulesForDoc"
          element={<RulesForDoc />}
        />
      </Routes>
    </Router>
  )
}

export default App