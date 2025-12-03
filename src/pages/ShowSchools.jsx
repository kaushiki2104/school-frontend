import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SchoolCard from "../component/SchoolCard.jsx";

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [pageInfo, setPageInfo] = useState({}); 
  const initialLoad = useRef(false);

useEffect(() => {
  if (!initialLoad.current) {
    fetchPage(1);
    initialLoad.current = true;
  }
}, []);

const fetchPage = (page = 1) => {
  axios.get(`http://localhost:5000/schools?page=${page}&limit=10`)
    .then(res => {
      setSchools(res.data.data);
      setPageInfo({
        page: res.data.page,
        totalPages: res.data.totalPages
      });
    });
};



  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Schools List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map(school => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          disabled={pageInfo.page === 1}
          onClick={() => fetchPage(pageInfo.page - 1)}
        >
          Previous
        </button>
          <span className="text-sm text-gray-700 items-center">
     {pageInfo.page} / {pageInfo.totalPages}
  </span>

        <button
          disabled={pageInfo.page === pageInfo.totalPages}
          onClick={() => fetchPage(pageInfo.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShowSchools;
