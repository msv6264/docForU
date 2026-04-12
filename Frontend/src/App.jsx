import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./genDoc/Home";
import TopicName from "./genDoc/TopicName";
import DocTypeSize from "./genDoc/DocTypeSize";
import StrucOfDoc from "./genDoc/StructOfDoc";
import RulesForDoc from "./genDoc/RulesForDoc";
import TemplateUpload from "./tempInj/TemplateUpload";

function App() {
  return (
    <Router>
      <Routes>
        {/* Engine 1 routes */}
        <Route path="/" element={<Home />} />
        <Route path="/TopicName" element={<TopicName />} />
        <Route path="/DocTypeSize" element={<DocTypeSize />} />
        <Route path="/StrucOfDoc" element={<StrucOfDoc />} />
        <Route path="/RulesForDoc" element={<RulesForDoc />} />


        {/* Engine 2 routes */}
        <Route path="/TemplateUpload" element={<TemplateUpload />} />

      </Routes>
    </Router>
  );
}

export default App;
