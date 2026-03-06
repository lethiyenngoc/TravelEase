const Contact = require("../../models/contact.model");
const SettingWebsiteInfo = require("../../models/setting-website-info.model");

// GET /contact
module.exports.index = async (req, res) => {
  const settingWebsiteInfo = await SettingWebsiteInfo.findOne({}); // thường chỉ có 1 record

  res.render("client/pages/contact", {
    pageTitle: "Liên hệ",
    settingWebsiteInfo
  });
};

module.exports.createPost = async (req, res) => {
  const { email } = req.body;

  const existEmail = await Contact.findOne({
    email: email
  });

  if(existEmail) {
    res.json({
      code: "error",
      message: "Email của bạn đã được đăng ký!"
    });
    return;
  }

  const newRecord = new Contact(req.body);
  await newRecord.save();

  req.flash("success", "Cảm ơn bạn đã đăng ký nhận tin tức!");

  res.json({
    code: "success"
  });
}
