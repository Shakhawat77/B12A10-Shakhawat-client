import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const { user, loading } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setPageLoading(false);
    }
  }, [loading]);

  if (pageLoading) {
    return (
      <section className="min-h-screen bg-base-200 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card bg-base-100 shadow-md animate-pulse">

            <div className="card-body border-b">
              <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
            </div>
            <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-300"></div>
                <div className="h-3 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="md:col-span-2 space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded"></div>
                  </div>
                ))}
                <div className="h-10 w-40 bg-gray-300 rounded"></div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;
  return (
    <section className="min-h-screen bg-base-200 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body border-b">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your account information
            </p>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-4">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" />
                  ) : (
                    <div className="bg-primary text-white flex items-center justify-center text-4xl h-full">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">

              <div>
                <label className="label font-semibold">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={user.displayName || "Not provided"}
                  readOnly
                />
              </div>

              <div>
                <label className="label font-semibold">Email Address</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user.email}
                  readOnly
                />
              </div>


              <div>
                <label className="label font-semibold">Account Created</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={new Date(
                    user.metadata.creationTime
                  ).toLocaleDateString()}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
