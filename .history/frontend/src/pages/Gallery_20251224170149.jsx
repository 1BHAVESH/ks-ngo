
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { galleryImages } from "@/data/ngo-data"
import { X } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-forest text-center mb-6">Gallery</h1>
          <p className="text-xl text-earth text-center max-w-3xl mx-auto">
            A glimpse into our sanctuary, rescue operations, and the beautiful cows we care for
          </p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-sage"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square bg-sage-light">
                  <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-forest font-semibold text-sm">{image.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-sage-light"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] flex flex-col">
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.title}
              className="max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}
