import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SchoolCard from "../component/SchoolCard.jsx";

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [pageInfo, setPageInfo] = useState({}); 
  const initialLoad = useRef(false);
  const [loading, setLoading] = useState(false); 
useEffect(() => {
  if (!initialLoad.current) {
    fetchPage(1);
    initialLoad.current = true;
  }
}, []);

const fetchPage = (page = 1) => {

   setLoading(true); 
  axios.get(`https://school-backend-4vxa.onrender.com/schools?page=${page}&limit=10`)
    .then(res => {
      setSchools(res.data.data);
      setPageInfo({
        page: res.data.page,
        totalPages: res.data.totalPages
      });
    })
    .catch((err) => {
        console.error(err);
        setSchools([]); 
      })
      .finally(() => {
        setLoading(false); 
      });
};


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Schools List</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : schools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <img src={"/no-data.svg"} alt="No data" className="w-64" />
          <p className="text-gray-500 mt-4 text-lg">No schools found</p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>

   <div className="mt-6 flex gap-4 justify-center">
        <button
          disabled={pageInfo.page === 1 || loading}
          onClick={() => fetchPage(pageInfo.page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 items-center">
          {pageInfo.page || 0} / {pageInfo.totalPages || 0}
        </span>
        <button
          disabled={pageInfo.page === pageInfo.totalPages || loading}
          onClick={() => fetchPage(pageInfo.page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
</>
      )}

   
    </div>
  );

}

export default ShowSchools;
