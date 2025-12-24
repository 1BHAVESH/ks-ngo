
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ------------------ YUP VALIDATION SCHEMA ------------------ */
const contactSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email"),

  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  /* ------------------ SUBMIT HANDLER ------------------ */
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Message Sent Successfully! (Demo)\n\nOur team will contact you soon.");
    reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#dee9d4] py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-[#0d3811] md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-3xl text-center text-xl text-[#65504a]">
            Get in touch with us for inquiries, volunteer opportunities, or to
            visit our sanctuary
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              <InfoCard icon={MapPin} title="Address">
                123 Gaushala Road, Vrindavan <br />
                Uttar Pradesh, 281121 <br />
                India
              </InfoCard>

              <InfoCard icon={Phone} title="Phone">
                +91 98765 43210 <br />
                +91 98765 43211
              </InfoCard>

              <InfoCard icon={Mail} title="Email">
                contact@cowsevango.org <br />
                info@cowsevango.org
              </InfoCard>

              <InfoCard icon={Clock} title="Visiting Hours">
                Monday - Saturday: 9:00 AM - 5:00 PM <br />
                Sunday: 10:00 AM - 4:00 PM
              </InfoCard>
            </div>

            {/* Contact Form */}
            <Card className="border-[#a3b49b] bg-[#fbfdf5] p-8">
              <h2 className="mb-6 text-2xl font-bold text-forest">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-2 block font-semibold text-forest">
                    Name
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="Your full name"
                    className="border-sage"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block font-semibold text-forest">
                    Email
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className="border-sage"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block font-semibold text-forest">
                    Message
                  </label>
                  <Textarea
                    rows={6}
                    {...register("message")}
                    placeholder="Your message..."
                    className="border-sage"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-forest text-cream hover:bg-forest/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-forest">
            Find Us
          </h2>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-sage-light">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.179!2d77.699!3d27.579"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cow Seva NGO Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------ REUSABLE INFO CARD ------------------ */
function InfoCard({ icon: Icon, title, children }) {
  return (
    <Card className="border-[#a3b49b] bg-[#fbfdf5] p-6">
      <div className="flex items-start gap-4">
        <Icon className="mt-1 h-6 w-6 flex-shrink-0 text-[#0d3811]" />
        <div>
          <h3 className="mb-2 font-bold text-[#0d3811]">{title}</h3>
          <p className="leading-relaxed text-[#65504a]">{children}</p>
        </div>
      </div>
    </Card>
  );
}
