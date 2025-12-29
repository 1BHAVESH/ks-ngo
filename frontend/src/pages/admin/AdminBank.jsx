import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBankInfoCreateMutation } from "@/redux/features/adminApi";

const schema = yup.object().shape({
  accountName: yup.string().required("Account Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  ifscCode: yup
    .string()
    .required("IFSC Code is required")
    .matches(/^[A-Z0-9]+$/, "Must be uppercase alphanumeric"),
  bankName: yup.string().required("Bank Name is required"),
  qrCode: yup.mixed().nullable(),
  isActive: yup.boolean().default(true),
});

function BankForm({ onSubmit, initialData = null, onCancel }) {
  const [bankInfoCreate] = useBankInfoCreateMutation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      qrCode: null,
      isActive: true,
    },
  });

  const submitHandler = async(data) => {
    if (data.qrCode && data.qrCode.length > 0) {
      data.qrCode = data.qrCode[0];

      const response = await bankInfoCreate(data).unwrap()
    } else {
      data.qrCode = initialData?.qrCode || null;
    }
    onSubmit?.(data);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
      <h2 className="text-xl font-bold text-gray-700">
        {initialData ? "Edit Bank Details" : "Add Bank Details"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Account Name</label>
        <input
          {...register("accountName")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="Cow Seva Trust"
        />
        {errors.accountName && (
          <p className="text-red-500 text-sm">{errors.accountName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <input
          {...register("accountNumber")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="1234567890123"
        />
        {errors.accountNumber && (
          <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">IFSC Code</label>
        <input
          {...register("ifscCode")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="SBIN0001234"
          onChange={(e) => setValue("ifscCode", e.target.value.toUpperCase())}
        />
        {errors.ifscCode && (
          <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input
          {...register("bankName")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="State Bank of India"
        />
        {errors.bankName && (
          <p className="text-red-500 text-sm">{errors.bankName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          QR Code (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("qrCode")}
          className="w-full border rounded-lg px-3 py-2"
        />
        {initialData?.qrCode && (
          <p className="text-xs text-gray-500 mt-1">
            Current: {initialData.qrCode.name || "QR Code uploaded"}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("isActive")} className="w-4 h-4" />
        <span className="text-sm font-medium">Is Active</span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit(submitHandler)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {initialData ? "Update" : "Save"} Bank Details
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function BankDetailsView({ bankData, onEdit }) {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Bank Account Details</h2>
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Account Name</p>
          <p className="font-medium text-gray-800">{bankData.accountName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Account Number</p>
          <p className="font-medium text-gray-800">{bankData.accountNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">IFSC Code</p>
          <p className="font-medium text-gray-800">{bankData.ifscCode}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Bank Name</p>
          <p className="font-medium text-gray-800">{bankData.bankName}</p>
        </div>

        {bankData.qrCode && (
          <div>
            <p className="text-sm text-gray-500">QR Code</p>
            <p className="text-sm text-green-600">✓ Uploaded</p>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              bankData.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {bankData.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BankDetailsManager() {
  const [bankData, setBankData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data) => {
    setBankData(data);
    setIsEditing(false);
    alert("Bank details saved successfully!");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      {!bankData || isEditing ? (
        <BankForm
          onSubmit={handleSubmit}
          initialData={isEditing ? bankData : null}
          onCancel={isEditing ? handleCancel : null}
        />
      ) : (
        <BankDetailsView bankData={bankData} onEdit={handleEdit} />
      )}
    </div>
  );
}