import Enquiry from "../models/Enquiry.js";



export const enquirySubmit = async (req, res) => {
  const { name: fullName, email, phone, message } = req.body;

  try {
    // ---------------- SAVE IN DATABASE ---------------- //
    const newContact = await Enquiry.create({
      fullName,
      email,
      phone,
      message,
      
    });

    //  SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      message:
        "Your enquiry has been submitted successfully. Our team will contact you soon.",
      data: newContact,
    });

  } catch (error) {
    console.error("Contact Submit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};


export const getAllEnqury = async (req, res) => {
  try {
    const enquiry = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiry.length,
      data: enquiry,
    });
  } catch (error) {
    console.error("Get enquiry Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry",
    });
  }
};


export const deleteEnquiry = async (req, res) => {
  try {

    const { id } = req.params;

    const deleteEnquiry = await Contact.findByIdAndDelete(id)

    if(!deleteEnquiry){
      return res.status(404).json({
        message: "Enquiry not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Enquiry deleted successfully",
      success: true
    })
    
  } catch (error) {

    return res.status(500).json({
      message: error.message || "Unable to delete enquiry",
      success: false
    });

    console.log("Deleted Enquiry Error:", error);     
    
  }
}