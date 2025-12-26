import { useState } from "react"
import { Upload, CheckCircle } from "lucide-react"

export default function DonationForm() {
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "upi",
    paymentScreenshot: null,
    paymentDetails: null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }))
      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }))
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.donorName.trim()) newErrors.donorName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits"
    if (!formData.amount.trim()) newErrors.amount = "Amount is required"
    else if (isNaN(formData.amount) || formData.amount <= 0) newErrors.amount = "Amount must be valid"
    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required"
    if (!formData.paymentDetails) newErrors.paymentDetails = "Invoice/Bill is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      setSubmitted(true)

      setTimeout(() => {
        setFormData({
          donorName: "",
          email: "",
          phone: "",
          amount: "",
          paymentMethod: "upi",
          paymentScreenshot: null,
          paymentDetails: null,
        })
        setSubmitted(false)
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="p-12 text-center border border-green-200 bg-white rounded-lg shadow-lg">
          <CheckCircle className="w-20 h-20 text-green-700 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-green-900 mb-4">Thank You for Your Donation!</h2>
          <p className="text-lg text-green-800 mb-6">
            Dear <span className="font-semibold">{formData.donorName}</span>, your generous donation of{" "}
            <span className="font-bold text-green-900">₹{formData.amount}</span> has been received.
          </p>
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <p className="text-green-800 mb-3">Your payment is under verification. You will receive an invoice via:</p>
            <div className="space-y-2 text-left inline-block">
              <p className="text-green-900 font-semibold">📧 Email: {formData.email}</p>
              <p className="text-green-900 font-semibold">📱 SMS: {formData.phone}</p>
            </div>
          </div>
          <p className="text-green-800 leading-relaxed">
            Your contribution will directly help us rescue, feed, and care for cows in need. We deeply appreciate your
            compassion and support for our mission.
          </p>
          <p className="text-sm text-green-700 mt-6 italic">Redirecting in a moment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-900 mb-2 text-center">Support Cow Seva</h2>
      <p className="text-green-800 text-center mb-8">Submit your donation with payment proof</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Payment Information */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-6">Payment Information</h3>
          
          <div className="space-y-6">
            {/* UPI Details */}
            <div className="bg-white p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 text-lg">UPI Payment</h4>
              <div className="space-y-2">
                <p className="text-green-800"><span className="font-semibold">UPI ID:</span> cowseva@upi</p>
                <p className="text-green-800"><span className="font-semibold">Name:</span> Cow Seva Trust</p>
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-white p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 text-lg">Bank Transfer</h4>
              <div className="space-y-2">
                <p className="text-green-800"><span className="font-semibold">Account Name:</span> Cow Seva Trust</p>
                <p className="text-green-800"><span className="font-semibold">Account Number:</span> 1234567890</p>
                <p className="text-green-800"><span className="font-semibold">IFSC Code:</span> SBIN0001234</p>
                <p className="text-green-800"><span className="font-semibold">Bank:</span> State Bank of India</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-green-700 p-5 rounded-lg text-white">
              <h4 className="font-bold mb-3 text-lg">Instructions</h4>
              <ol className="space-y-2 text-sm">
                <li>1. Make payment using any method above</li>
                <li>2. Take a screenshot of the payment confirmation</li>
                <li>3. Fill out the form and upload the screenshot</li>
                <li>4. We'll verify and send you an invoice within 24 hours</li>
              </ol>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 text-lg">Need Help?</h4>
              <div className="space-y-2 text-sm">
                <p className="text-green-800">📧 Email: support@cowseva.org</p>
                <p className="text-green-800">📱 Phone: +91 98765 43210</p>
                <p className="text-green-800">🕐 Available: 9 AM - 6 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Donation Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-6">Donation Details</h3>
          
          <div className="space-y-6">
            {/* Donor Information */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Full Name *</label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  errors.donorName ? "border-red-500" : "border-green-200"
                }`}
                placeholder="Enter your full name"
              />
              {errors.donorName && <p className="text-red-500 text-sm mt-1">{errors.donorName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  errors.email ? "border-red-500" : "border-green-200"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  errors.phone ? "border-red-500" : "border-green-200"
                }`}
                placeholder="10-digit phone number"
                maxLength="10"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Donation Amount (₹) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  errors.amount ? "border-red-500" : "border-green-200"
                }`}
                placeholder="Enter amount"
                min="1"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="card">Debit/Credit Card</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Payment Screenshot */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Payment Screenshot *</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  errors.paymentScreenshot ? "border-red-500 bg-red-50" : "border-green-300 hover:bg-green-50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "paymentScreenshot")}
                  className="hidden"
                  id="screenshotInput"
                />
                <label htmlFor="screenshotInput" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-green-700 mx-auto mb-2" />
                  <p className="text-green-900 font-semibold">Click to upload</p>
                  <p className="text-green-800 text-sm">or drag and drop</p>
                  <p className="text-green-700 text-xs mt-2">PNG, JPG up to 10MB</p>
                </label>
                {formData.paymentScreenshot && (
                  <p className="text-green-900 font-semibold mt-3">{formData.paymentScreenshot.name}</p>
                )}
              </div>
              {errors.paymentScreenshot && <p className="text-red-500 text-sm mt-1">{errors.paymentScreenshot}</p>}
            </div>

            {/* Invoice/Bill */}
            <div>
              <label className="block text-sm font-semibold text-green-900 mb-2">Invoice / Bill Document *</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  errors.paymentDetails ? "border-red-500 bg-red-50" : "border-green-300 hover:bg-green-50"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) => handleFileChange(e, "paymentDetails")}
                  className="hidden"
                  id="invoiceInput"
                />
                <label htmlFor="invoiceInput" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-green-700 mx-auto mb-2" />
                  <p className="text-green-900 font-semibold">Click to upload</p>
                  <p className="text-green-800 text-sm">or drag and drop</p>
                  <p className="text-green-700 text-xs mt-2">PDF, DOC, JPG up to 10MB</p>
                </label>
                {formData.paymentDetails && (
                  <p className="text-green-900 font-semibold mt-3">{formData.paymentDetails.name}</p>
                )}
              </div>
              {errors.paymentDetails && <p className="text-red-500 text-sm mt-1">{errors.paymentDetails}</p>}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-lg font-semibold rounded-lg transition-colors"
            >
              Submit Donation
            </button>
          </div>

          <p className="text-center text-green-800 text-sm mt-6">
            Your privacy is important to us. We will verify your payment and send the invoice within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}