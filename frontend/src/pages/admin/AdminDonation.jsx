import {
  useExcelImportDonationsMutation,
  useGetDonateQuery,
} from "@/redux/features/adminApi";
import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const AdminDonation = () => {
  const [excelImportDonations] = useExcelImportDonationsMutation();
  const { data, isLoading } = useGetDonateQuery();
  const [selectedImage, setSelectedImage] = useState(null);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // if (isLoading) return <h1 className="p-4 text-gray-300">Loading...</h1>;

  const donations = data?.donations || [];

  // 🔍 Filtering + Sorting + Searching (Memoized)
  const filteredData = useMemo(() => {
    let list = [...donations];

    // Search
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(
        (d) =>
          d.donorName?.toLowerCase().includes(s) ||
          d.email?.toLowerCase().includes(s) ||
          d.phone?.toString().includes(s)
      );
    }

    // Filter Payment Method
    if (methodFilter) {
      list = list.filter((d) => d.paymentMethod === methodFilter);
    }

    // Sorting
    if (sortBy === "amount-asc") list.sort((a, b) => a.amount - b.amount);
    if (sortBy === "amount-desc") list.sort((a, b) => b.amount - a.amount);

    if (sortBy === "date-asc")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "date-desc")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [donations, searchTerm, methodFilter, sortBy]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginated = filteredData.slice(start, start + pageSize);

  // Excel Export
  const handleExportExcel = () => {
    if (!filteredData.length) return;

    const excelData = filteredData.map((d) => ({
      Donor: d.donorName,
      Email: d.email,
      Phone: d.phone,
      Amount: d.amount,
      Method: d.paymentMethod,
      photo: d.paymentScreenshot,
      Date: new Date(d.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, `donations_${Date.now()}.xlsx`);
  };

  const handleExcelUpload = async () => {
    if (!file) return setMessage("Please select an Excel (.xlsx) file first");

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("excelFile", file);

      const res = await excelImportDonations(formData).unwrap();

      setMessage(res.message || "Upload Success 🎉");
    } catch (err) {
      console.log(err)
      console.log(err.message);
      
      toast.error(err.data.message)
      // 422 case : backend sends download link
      if (err?.data?.download) {
        setMessage("Some rows had errors. Download error file 👇");
        window.open(err.data.download, "_blank");
      } else {
        setMessage(err?.data?.message || "Upload failed ❌");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-900">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
          Donation Submissions
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* FILE INPUT */}
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded"
          />

          {/* UPLOAD BUTTON */}
          <button
            onClick={handleExcelUpload}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "📥 Import Excel"}
          </button>

          {/* EXPORT BUTTON */}
          <button
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded shadow"
          >
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-700 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="🔍 Search name / email / phone..."
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 outline-none focus:border-green-500 transition"
        />

        <select
          value={methodFilter}
          onChange={(e) => {
            setMethodFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value="">💳 All Payment Methods</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash">Cash</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value="">🔄 Sort By</option>
          <option value="amount-asc">Amount Low → High</option>
          <option value="amount-desc">Amount High → Low</option>
          <option value="date-asc">Oldest First</option>
          <option value="date-desc">Newest First</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value={5}>📄 5 / Page</option>
          <option value={10}>📄 10 / Page</option>
          <option value={20}>📄 20 / Page</option>
        </select>
      </div>

      {/* RESULTS COUNT */}
      <div className="text-gray-400 mb-4 text-xs sm:text-sm px-1">
        Showing{" "}
        <span className="text-green-400 font-semibold">
          {start + 1}-{Math.min(start + pageSize, filteredData.length)}
        </span>{" "}
        of{" "}
        <span className="text-green-400 font-semibold">
          {filteredData.length}
        </span>{" "}
        donations
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700 text-gray-200 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-3 sm:px-4 py-3">Donor Name</th>
              <th className="px-3 sm:px-4 py-3">Email</th>
              <th className="px-3 sm:px-4 py-3">Phone</th>
              <th className="px-3 sm:px-4 py-3">Amount</th>
              <th className="px-3 sm:px-4 py-3">Payment Method</th>
              <th className="px-3 sm:px-4 py-3">Date</th>
              <th className="px-3 sm:px-4 py-3">photo</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((donation) => (
                <tr
                  key={donation._id}
                  className="border-b border-gray-700 hover:bg-gray-750 transition"
                >
                  <td className="px-3 sm:px-4 py-3 font-medium">
                    {donation.donorName}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm">
                    {donation.email}
                  </td>
                  <td className="px-3 sm:px-4 py-3">{donation.phone}</td>
                  <td className="px-3 sm:px-4 py-3 text-green-400 font-semibold">
                    ₹{donation.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs whitespace-nowrap">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    {donation.paymentScreenshot ? (
                      <button
                        onClick={() => setSelectedImage(donation.paymentScreenshot)}
                        className="text-green-400 hover:text-green-300 underline text-sm"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {paginated.length > 0 ? (
          paginated.map((donation) => (
            <div
              key={donation._id}
              className="bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-700 space-y-3 shadow-lg hover:border-green-500 transition"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-green-400 truncate">
                    {donation.donorName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {donation.email}
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-green-400 whitespace-nowrap">
                  ₹{donation.amount.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500 block mb-1">📞 Phone</span>
                  <p className="text-gray-300 font-medium">{donation.phone}</p>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500 block mb-1">💳 Method</span>
                  <span className="inline-block px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs">
                    {donation.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-500">
                  📅{" "}
                  {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {donation.paymentProof ? (
                  <button
                    onClick={() => setSelectedImage(donation.paymentProof)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm transition"
                  >
                    📄 View Receipt
                  </button>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm">
                    No Receipt
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 text-center">
            <div className="text-4xl sm:text-5xl mb-3">📭</div>
            <p className="text-gray-500 text-sm sm:text-base">
              No donations found
            </p>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium text-sm sm:text-base"
          >
            ⬅ Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs sm:text-sm">Page</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-green-400 font-bold text-sm sm:text-base">
              {currentPage}
            </span>
            <span className="text-gray-400 text-xs sm:text-sm">of</span>
            <span className="bg-gray-800 px-3 py-1 rounded text-gray-300 font-bold text-sm sm:text-base">
              {totalPages || 1}
            </span>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-800 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition font-medium text-sm sm:text-base"
          >
            Next ➡
          </button>
        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute cursor-pointer top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 transition"
          >
            ✕
          </button>

          <img
            src={`${API_URL}/uploads${selectedImage}`}
            alt="Payment Receipt"
            className="max-w-[90%] max-h-[85vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDonation;
