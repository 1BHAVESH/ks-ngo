import { useState } from "react";
import { Card } from "@/components/ui/card";
import { galleryImages } from "@/data/ngo-data";
import { X } from "lucide-react";

export default function GalleryPage() {
  // safety check (debug ke liye)
  console.log("Gallery Images:", galleryImages);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#dee9d4] py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-[#0d3811] md:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto max-w-3xl text-center text-xl text-earth">
            A glimpse into our sanctuary, rescue operations, and the beautiful cows we care for
          </p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.isArray(galleryImages) &&
              galleryImages.map((image) => (
                <Card
                  key={image.id}
                  className="cursor-pointer overflow-hidden border-sage transition-shadow hover:shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square bg-sage-light">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-semibold text-forest">
                      {image.title}
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-sage-light"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>

          <div
            className="flex max-h-[90vh] max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.title}
              className="max-h-[80vh] object-contain"
            />
            <p className="mt-4 text-center text-lg text-white">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
