import AddSchool from "./pages/AddSchool.jsx";
import ShowSchools from "./pages/ShowSchools.jsx";
import { BrowserRouter, Routes, Route,NavLink  } from "react-router-dom";
 import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <div className="p-4 flex gap-4 bg-gray-100">
     
         <NavLink
      to="/"
      end
      className={({ isActive }) =>
        isActive
          ? "font-bold text-blue-600 border-b-2 border-blue-600"
          : "text-gray-700"
      }
    >
      Add School
    </NavLink>

    <NavLink
      to="/schools"
      className={({ isActive }) =>
        isActive
          ? "font-bold text-blue-600 border-b-2 border-blue-600"
          : "text-gray-700"
      }
    >
      Show Schools
    </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
          <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;

