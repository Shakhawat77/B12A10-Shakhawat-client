import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const AddAJobs = () => {
  const { user } = useAuth(); // ✅ get current user from AuthProvider
  const [loading, setLoading] = useState(false);

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const jobData = {
      title: form.title.value,
      postedBy: user?.displayName || user?.email, // fallback
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
   
    };

    try {
      const res = await fetch("http://localhost:3000/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to post job");

      alert("✅ Job posted successfully!");
      form.reset();
    } catch (err) {
      console.error("❌ Error posting job:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#47aa8e] to-[#6497a8] py-20">
        <div className="max-w-2xl mx-auto   rounded-xl shadow-lg bg-gradient-to-r from-[#2fcfa2] to-[#437586] px-2 ">
      <h2 className="text-3xl font-bold text-white text-center mb-6"> Post a New Job</h2>

      <form onSubmit={handleJobPost} className="space-y-4">

        <div>
          <label className="font-semibold block mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full bg-[#3a826d] text-white"
            placeholder="Enter job title"
            required
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">User Name</label>
          <input
            type="text"
            value={user?.displayName || user?.email || ""}
            className="input input-bordered w-full bg-[#3a826d] text-white"
            readOnly
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Category</label>
          <select name="category" className="select select-bordered w-full  bg-[#3a826d] text-white" required>
            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Graphics Design</option>
            <option>Digital Marketing</option>
            <option>SEO</option>
            <option>Video Editing</option>
          </select>
        </div>
        <div>
          <label className="font-semibold block mb-1">Summary</label>
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full  bg-[#3a826d] text-white"
            placeholder="Enter job summary or requirements"
            required
          ></textarea>
        </div>
        <div>
          <label className="font-semibold block mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            placeholder="Paste image URL"
            className="input input-bordered w-full  bg-[#3a826d] text-white"
            required
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full  bg-[#3a826d] text-white"
            readOnly
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary animate-gradient w-full"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
    </div>
  
  );
};

export default AddAJobs;
