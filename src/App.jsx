import AddSchool from "./pages/AddSchool.jsx";
import ShowSchools from "./pages/ShowSchools.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
 
function App() {
  return (
    <BrowserRouter>
      <div className="p-4 flex gap-4 bg-gray-100">
        <Link to="/">Add School</Link>
        <Link to="/schools">Show Schools</Link>
      </div>

      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

