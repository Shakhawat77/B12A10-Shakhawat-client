import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const AddAJobs = () => {
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jobData = {
      ...formData,
      postedBy: user?.displayName || user?.email,
      userEmail: user?.email,
    };

    try {
      const res = await fetch(
        "https://freelance-server-beige.vercel.app/addJob",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        }
      );

      if (!res.ok) throw new Error("Failed to post job");

      const result = await res.json();
      toast.success("Job posted successfully!");
      
      setFormData({ title: "", category: "", summary: "", coverImage: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#47aa8e] to-[#6497a8] py-20">
      <div className="max-w-2xl mx-auto rounded-xl shadow-lg bg-gradient-to-r from-[#2fcfa2] to-[#437586] px-6 py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Post a New Job
        </h2>

        <form onSubmit={handleJobPost} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="input input-bordered w-full bg-[#3a826d] text-white"
            required
          />
          <input
            type="text"
            placeholder="User Name"
            value={user?.displayName || user?.email || ""}
            className="input input-bordered w-full bg-[#3a826d] text-white"
            readOnly
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="select select-bordered w-full bg-[#3a826d] text-white"
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
            placeholder="Job Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            className="textarea textarea-bordered w-full bg-[#3a826d] text-white"
            required
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.value })
            }
            className="input input-bordered w-full bg-[#3a826d] text-white"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-[#3a826d] text-white"
          />
          <button
            type="submit"
            className="btn btn-primary animate-gradient w-full"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAJobs;
