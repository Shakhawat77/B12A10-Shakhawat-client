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
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">📝 Post a New Job</h2>

      <form onSubmit={handleJobPost} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="font-semibold block mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* User Name (Read-only) */}
        <div>
          <label className="font-semibold block mb-1">User Name</label>
          <input
            type="text"
            value={user?.displayName || user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold block mb-1">Category</label>
          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select Category</option>
            <option>Web Development</option>
            <option>Graphics Design</option>
            <option>Digital Marketing</option>
            <option>SEO</option>
            <option>Video Editing</option>
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="font-semibold block mb-1">Summary</label>
          <textarea
            name="summary"
            className="textarea textarea-bordered w-full"
            placeholder="Enter job summary or requirements"
            required
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="font-semibold block mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            placeholder="Paste image URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* User Email (Read-only) */}
        <div>
          <label className="font-semibold block mb-1">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAJobs;
