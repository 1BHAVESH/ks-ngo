import { useGetDonateQuery } from "@/redux/features/adminApi";
import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const AdminDonation = () => {
  const { data, isLoading } = useGetDonateQuery();
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <h1 className="p-4 text-gray-300">Loading...</h1>;

  const donations = data?.donations || [];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-6">
        Donation Submissions
      </h2>

      {/* Desktop Table View - Hidden on Mobile/Tablet */}
      <div className="hidden lg:block bg-gray-800 shadow-xl rounded-xl border border-gray-700">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full w-full">
            <thead className="bg-gray-900/50">
              <tr className="text-left text-base">
                <th className="p-4 font-semibold text-green-400">Donor</th>
                <th className="p-4 font-semibold text-green-400">Email</th>
                <th className="p-4 font-semibold text-green-400">Phone</th>
                <th className="p-4 font-semibold text-green-400">Amount</th>
                <th className="p-4 font-semibold text-green-400">Method</th>
                <th className="p-4 font-semibold text-green-400">Screenshot</th>
                <th className="p-4 font-semibold text-green-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr
                  key={d._id}
                  className="border-t border-gray-700 hover:bg-gray-700/50 transition"
                >
                  <td className="p-4 font-semibold text-gray-200">
                    {d.donorName}
                  </td>
                  <td className="p-4 text-gray-400">{d.email}</td>
                  <td className="p-4 text-gray-400">{d.phone}</td>
                  <td className="p-4 font-bold text-green-400">
                    ₹{Number(d.amount).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-sm border border-green-700">
                      {d.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedImage(d.paymentScreenshot)}
                      className="text-green-400 underline cursor-pointer hover:text-green-300"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No donations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View - Hidden on Desktop */}
      <div className="lg:hidden space-y-4">
        {donations.map((d) => (
          <div
            key={d._id}
            className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-700 pb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-200">
                  {d.donorName}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{d.email}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-xs font-medium border border-green-700">
                {d.paymentMethod}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-sm text-gray-300 font-medium mt-1">
                  {d.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Amount
                </p>
                <p className="text-lg text-green-400 font-bold mt-1">
                  ₹{Number(d.amount).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                {new Date(d.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedImage(d.paymentScreenshot)}
                className="text-green-400 text-sm font-medium underline hover:text-green-300"
              >
                View Screenshot
              </button>
            </div>
          </div>
        ))}

        {donations.length === 0 && (
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 text-center">
            <p className="text-gray-500">No donations yet</p>
          </div>
        )}
      </div>

      {/* Modal for Screenshot */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute cursor-pointer top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 transition"
          >
            ✕
          </button>

          <img
           src={`${API_URL}/uploads${selectedImage}`}
            alt="Preview"
            className="max-w-[90%] max-h-[85vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDonation;