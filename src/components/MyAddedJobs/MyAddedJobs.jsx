
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const MyAddedJobs = () => {
  const { user } = useAuth(); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(
          `https://freelance-server-beige.vercel.app/myAddedJobs?email=${user.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`https://freelance-server-beige.vercel.app/deleteJob/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete job");

      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const openUpdateModal = (job) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJob(null);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(
        `https://freelance-server-beige.vercel.app/updateJob/${currentJob._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update job");

      const updatedJob = await res.json();
      setJobs(jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job)));
      toast.success("Job updated successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error( err.message);
    } finally {
      setUpdating(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading your jobs...</p>
      </div>
    );
  }
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No jobs added yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-gradient-to-r from-[#2fcfa2] to-[#437586] p-4 rounded-xl shadow-lg flex flex-col justify-between"
        >
          <img
            src={job.coverImage}
            alt={job.title}
            className="h-40 w-full object-cover rounded mb-4"
          />
          <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
          <p className="text-white mb-2">{job.summary}</p>
          <p className="text-white mb-2">Category: {job.category}</p>
          <p className="text-white mb-4">Posted By: {job.postedBy}</p>
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => openUpdateModal(job)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center bg-gradient-to-r from-[#2fcfa2] to-[#437586] justify-center z-50">
          <div className="bg-gradient-to-r from-[#2fcfa2] to-[#437586] rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Job</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option>Web Development</option>
                <option>Graphics Design</option>
                <option>Digital Marketing</option>
                <option>SEO</option>
                <option>Video Editing</option>
              </select>
              <textarea
                name="summary"
                placeholder="Job Summary"
                value={formData.summary}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />
              <input
                type="text"
                name="coverImage"
                placeholder="Cover Image URL"
                value={formData.coverImage}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
