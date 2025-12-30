const PopupMessage = require("../models/popupMessage.model"); // adjust path if needed

const getPopupMessageBanner = async (req, res) => {
  try {
    const { subscriberID } = req.query;

    if (!subscriberID) {
      return res.status(200).json({
        isSuccess: false,
        errorMessage: "subscriberID is required",
        exceptionDetail: null,
        dataBundle: [],
        errorShow: null,
        errorCode: null
      });
    }

    // ================= TMF-ALIGNED QUERY ================= 

    const now = new Date();

    const records = await PopupMessage.find({
      lifecycleStatus: "ACTIVE",
      $or: [
        { subscriber_id: subscriberID },
        { subscriber_id: { $exists: false } },
        { subscriber_id: null }
      ],
      $or: [
        { validFor: { $exists: false } },
        {
          "validFor.startDateTime": { $lte: now },
          "validFor.endDateTime": { $gte: now }
        }
      ]
    }).lean();

    // ================= LEGACY RESPONSE MAPPING ================= 

    const dataBundle = records.map((item) => ({
      notid: item.id,
      title: item.title || "",
      message: item.message || "",
      popup_URL: item.popup_URL || "",
      action: item.action || "",
      popup_TYPE: item.popup_TYPE || "",
      button_TITLE: item.button_TITLE || "",
      noT_TYPE: item.noT_TYPE || "",
      noT_DATE: item.noT_DATE ? item.noT_DATE.toISOString() : "",
      status: item.status || "ACTIVE",
      button_NAME: item.button_NAME || "",
      created_USER: item.created_USER || "",
      created_DATE: item.created_DATE ? item.created_DATE.toISOString() : ""
    
    }));


    // TODO: Replace with DB logic later
  /*  const dataBundle = [
      {
        notid: "1",
        title: "Message",
        message: "Do you want to register with SLT eBill.",
        popup_URL: "https://bannerportal.slt.lk/uploads/16to9/fb57a7fae34cd622319f76a99fb897a8.jpeg",
        action: "RegistereBill",
        popup_TYPE: "A",
        button_TITLE: "Yes",
        noT_TYPE: "public",
        noT_DATE: "4/7/2022 5:05:43 PM",
        status: "ACTIVE",
        button_NAME: "Register eBill",
        created_USER: "",
        created_DATE: ""
      }
    ];*/

    return res.status(200).json({
      isSuccess: true,
      errorMessage: null,
      exceptionDetail: null,
      dataBundle,
      errorShow: null,
      errorCode: null
    });

  } catch (err) {
    return res.status(200).json({
      isSuccess: false,
      errorMessage: "Unexpected error",
      exceptionDetail: err.message,
      dataBundle: [],
      errorShow: null,
      errorCode: null
    });
  }
};

module.exports = {
  getPopupMessageBanner
};
