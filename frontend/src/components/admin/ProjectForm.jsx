import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const CowForm = ({ open, onOpenChange, cow, length }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const isEditing = !!cow;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      title: "",
      order: 0,
    },
  });

  useEffect(() => {
    if (cow) {
      setValue('title', cow.title);
      setValue('order', cow.order);
      setImagePreview(cow.imageUrl);
    } else {
      reset({
        title: "",
        order: 0,
      });
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [cow, reset, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (file.size > maxSize) {
        alert('Image size must be less than 5MB');
        e.target.value = null;
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        alert('Please upload an image file');
        e.target.value = null;
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      title: data.title,
      order: data.order,
      imageUrl: imagePreview,
      image: selectedImage
    };

    console.log('Form submitted:', formData);
    
    // Here you would typically call your API or parent handler
    // For example: onSave(formData);
    
    handleClose();
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="[&>button]:cursor-pointer bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Cow" : "Add New Cow"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cow Name */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Cow Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter cow name"
              className="bg-zinc-800 border-zinc-700"
              {...register("title", {
                required: "Cow name is required",
                validate: (value) =>
                  value.trim().length > 0 || "Name cannot be empty",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>
              Cow Image <span className="text-red-500">*</span>
            </Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedImage(null);
                  }}
                  className="absolute cursor-pointer top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors">
                <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                <span className="text-zinc-400 text-sm">Click to upload image</span>
                <span className="text-red-500 text-xs mt-1">Max: 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              placeholder="0"
              min="0"
              max={length || 100}
              className="bg-zinc-800 border-zinc-700"
              {...register("order", {
                valueAsNumber: true,
                validate: (value) => value >= 0 || "Order cannot be negative",
              })}
            />
            {errors.order && (
              <p className="text-red-500 text-sm">{errors.order.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-zinc-700 text-white hover:bg-zinc-600 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              className="bg-[#d4af37] text-black hover:bg-[#c4a137] cursor-pointer"
            >
              {isEditing ? "Update Cow" : "Add Cow"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CowForm;