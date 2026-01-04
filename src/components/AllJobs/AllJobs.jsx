import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const categories = [
    "Web Development",
    "Graphics Design",
    "Digital Marketing",
    "SEO",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://freelance-server-beige.vercel.app/allJobs?sort=${sortOrder}`
        );
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [sortOrder]);

  useEffect(() => {
    let result = [...jobs];
    if (categoryFilter) {
      result = result.filter((job) => job.category === categoryFilter);
    }
    if (searchTerm) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredJobs(result);
    setCurrentPage(1);
  }, [jobs, categoryFilter, searchTerm]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(jobsPerPage)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="h-52 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                    <div className="h-8 bg-gray-300 rounded w-28"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg font-medium">
        No jobs found with current filters.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#6BCB77] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl font-bold text-white mb-4 sm:mb-0">
            Explore Freelance Jobs
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-64 bg-white dark:bg-gray-800/90"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered bg-white dark:bg-gray-800/90"
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered bg-white dark:bg-gray-800/90"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="bg-gradient-to-r from-[#FF6B6B] to-[#6BCB77] rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-3 left-3 bg-[#FFD93D] text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full font-medium">
                  {job.category}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-1">
                  {job.title}
                </h2>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {job.summary}
                </p>

                <div className="text-sm text-gray-500 mb-4">
                  Posted by{" "}
                  <span className="font-medium text-gray-700">
                    {job.postedBy || job.userEmail}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-xs">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/job/${job._id}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FF6B6B] text-white hover:bg-[#e85b5b]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn btn-outline btn-sm bg-white dark:bg-gray-800"
          >
            Prev
          </button>
          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn btn-outline btn-sm bg-white dark:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
