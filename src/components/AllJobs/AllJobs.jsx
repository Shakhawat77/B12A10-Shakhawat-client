import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); 

 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/job?sort=${sortOrder}`);
        const data = await res.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [sortOrder]); 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg font-medium">
        No jobs found. Please add some jobs.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#47aa8e] to-[#6497a8] to-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-0">
             Explore Freelance Jobs
          </h1>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-gray-700 font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered border-blue-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gradient-to-r from-[#49c9a5] to-[#4db4d7] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-none group"
            >
              <div className="relative">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {job.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {job.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {job.summary}
                </p>

                <div className="text-sm text-gray-500 mb-4">
                  Posted by:{" "}
                  <span className="font-medium text-gray-700">
                    {job.postedBy || job.userEmail}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-xs">
                    🕒{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <Link
                    to={`/job/${job._id}`}
                    className="bg-gradient-to-r from-blue-500 to-sky-400 animate-gradient text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
