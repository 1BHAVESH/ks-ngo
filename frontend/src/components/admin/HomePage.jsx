import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetHomePageQuery,
  useUpdateHomePageMutation,
} from "@/redux/features/homePageApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const HomePage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const { data, isLoading, refetch } = useGetHomePageQuery();
  const [updateHomePage, { isLoading: updateLoading }] =
    useUpdateHomePageMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [statsData, setStatsData] = useState({
    Cows_Rescued: 0,
     Active_Volunteers: 0,
    Years_of_Service: 0,
    Successful_Adoptions: 0,
  });

  const [testimonials, setTestimonials] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const watchPhoto = watch("photo");

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  useEffect(() => {
    if (data) {
      setStatsData(data.stats || {});
      setTestimonials(data.testimonials || []);
    }
  }, [data]);

  useEffect(() => {
    if (watchPhoto?.[0] instanceof File) {
      const url = URL.createObjectURL(watchPhoto[0]);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setPhotoPreview(null);
  }, [watchPhoto]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleOpenModal = (section, testimonial = null) => {
    setOpenSection(section);
    setPhotoPreview(null);

    if (section === "stats") reset(statsData);

    if (section === "testimonials") {
      if (testimonial) {
        reset(testimonial);
        setEditingTestimonialId(testimonial.id);
        setPhotoPreview(testimonial.photo);
      } else {
        reset({ name: "", position: "", message: "" });
        setEditingTestimonialId(null);
      }
    }
  };

  const onSubmit = async (formData) => {
    try {
      let updatedStats = statsData;
      let updatedTestimonials = testimonials;

      if (openSection === "stats") {
        updatedStats = {
          Cows_Rescued: +formData.Cows_Rescued,
           Active_Volunteers: +formData.Active_Volunteers,
         Years_of_Service: +formData.Years_of_Service,
          Successful_Adoptions: +formData.Successful_Adoptions,
        };
        setStatsData(updatedStats);
      }

      if (openSection === "testimonials") {
        const photo =
          formData.photo?.[0] && (await fileToBase64(formData.photo[0]));

        if (editingTestimonialId) {
          updatedTestimonials = testimonials.map((t) =>
            t.id === editingTestimonialId
              ? { ...t, ...formData, photo: photo || t.photo }
              : t
          );
        } else {
          updatedTestimonials = [
            ...testimonials,
            { id: Date.now(), ...formData, photo },
          ];
        }

        setTestimonials(updatedTestimonials);
      }

      console.log(formData)

      await updateHomePage({
        stats: updatedStats,
        testimonials: updatedTestimonials,
      }).unwrap();

      refetch();
      setOpenSection(null);
      reset();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      const updatedTestimonials = testimonials.filter((t) => t.id !== id);
      setTestimonials(updatedTestimonials);

      await updateHomePage({
        stats: statsData,
        testimonials: updatedTestimonials,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8">
      {/* PAGE HEADER */}

      {/* --------- STATS SECTION --------- */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-700">
        <SectionHeader
          title="📊 Statistics Section"
          onClick={() => handleOpenModal("stats")}
        />

        {/* Desktop Table */}
        <DesktopTable
          headers={[
            "🐄 Cows Rescued",
            "🙋 Active Volunteers",
            "📅 Years of Service",
            "🏠 Successful Adoptions",
          ]}
        >
          <tr className="hover:bg-gray-750 transition">
            {Object.values(statsData).map((v, i) => (
              <td
                key={i}
                className="border border-gray-600 p-3 sm:p-4 text-center text-lg sm:text-xl font-bold text-blue-400"
              >
                {v}
              </td>
            ))}
          </tr>
        </DesktopTable>

        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[
            {
              label: "Cows Rescued",
              value: statsData.Cows_Rescued,
              icon: "🐄",
              color: "yellow",
            },
            {
              label: "Active Volunteers",
              value: statsData.Active_Volunteers,
              icon: "🙋",
              color: "blue",
            },
            {
              label: "Years of Service",
              value: statsData.Years_of_Service,
              icon: "📅",
              color: "green",
            },
            {
              label: "Successful Adoptions",
              value: statsData.Successful_Adoptions,
              icon: "🏠",
              color: "purple",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gray-900 rounded-lg p-4 border-2 border-${stat.color}-500/30 hover:border-${stat.color}-500 transition`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --------- TESTIMONIALS SECTION --------- */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-700">
        <SectionHeader
          title="💬 Testimonials"
          onClick={() => handleOpenModal("testimonials")}
          btnText="➕ Add New"
        />

        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-400 text-lg">No testimonials yet</p>
            <button
              onClick={() => handleOpenModal("testimonials")}
              className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add First Testimonial
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <DesktopTable
              headers={["Photo", "Name", "Position", "Message", "Actions"]}
            >
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-gray-750 transition">
                  <td className="border border-gray-600 p-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-500 mx-auto"
                    />
                  </td>
                  <td className="border border-gray-600 p-3 font-semibold text-gray-200">
                    {t.name}
                  </td>
                  <td className="border border-gray-600 p-3 text-gray-400">
                    {t.position}
                  </td>
                  <td className="border border-gray-600 p-3 text-gray-300 max-w-md">
                    <div className="line-clamp-2">{t.message}</div>
                  </td>
                  <td className="border border-gray-600 p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleOpenModal("testimonials", t)}
                        className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </DesktopTable>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {t.position}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 bg-gray-800 p-3 rounded">
                    "{t.message}"
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal("testimonials", t)}
                      className="flex-1 cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* --------- MODAL --------- */}
      {openSection && (
        <Modal onClose={() => setOpenSection(null)}>
          {openSection === "stats" && (
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                📊 Edit Statistics
              </h3>

              {[
                { name: "Cows_Rescued", label: "🐄 Cows Rescued" },
                { name: "Active_Volunteers", label: "🙋 Active Volunteers" },
                { name: "Years_of_Service", label: "📅 Years of Service" },
                { name: "Successful_Adoptions", label: "🏠 Successful Adoptions" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    {...register(field.name, { required: true, min: 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder={`Enter number of ${field.label.toLowerCase()}`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={updateLoading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? "Saving..." : "💾 Save Statistics"}
              </button>
            </div>
          )}

          {openSection === "testimonials" && (
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                {editingTestimonialId ? "✏️ Edit" : "➕ Add"} Testimonial
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💼 Position
                </label>
                <input
                  type="text"
                  {...register("position", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter position/role"
                />
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">
                    Position is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💬 Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Enter testimonial message"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    Message is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📷 Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {photoPreview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={updateLoading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading
                  ? "Saving..."
                  : editingTestimonialId
                  ? "💾 Update Testimonial"
                  : "➕ Add Testimonial"}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomePage;

// ========== COMPONENTS ==========

const SectionHeader = ({ title, onClick, btnText = "✏️ Update" }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
      {title}
    </h2>
    <button
      onClick={onClick}
      className="w-full cursor-pointer sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
    >
      {btnText}
    </button>
  </div>
);

const DesktopTable = ({ headers, children }) => (
  <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
    <table className="w-full border-collapse bg-gray-900 text-white">
      <thead className="bg-gray-700">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border border-gray-600 p-3 sm:p-4 text-left font-semibold text-sm sm:text-base"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
    <div className="bg-white w-full max-w-lg p-4 sm:p-6 rounded-xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
      {children}

      <button
        onClick={onClose}
        className="mt-6 w-full cursor-pointer bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
      >
        ✖️ Close
      </button>
    </div>
  </div>
);
