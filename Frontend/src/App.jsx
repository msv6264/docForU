import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import TopicName from "./pages/TopicName";
import DocTypeSize from "./pages/DocTypeSize";
import StrucOfDoc from "./pages/StructOfDoc";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/TopicName" element={<TopicName/>} />
        <Route path="/DocTypeSize" element={<DocTypeSize/>} />
        <Route path="/StrucOfDoc" element={<StrucOfDoc/>} />
      </Routes>
    </Router>
  )
}

export default App
