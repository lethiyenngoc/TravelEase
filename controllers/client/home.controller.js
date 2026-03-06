const Tour = require("../../models/tour.model");
const moment = require("moment");
const categoryHelper = require("../../helpers/category.helper");

module.exports.home = async (req, res) => {
  // Section 2
  const tourListSection2 = await Tour
    .find({
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(6)

  for(const item of tourListSection2) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  // End Section 2

  // Section 4: Tour Trong Nước
  const categoryIdSection4 = "67ff5cdabe22376ce45c4d2a"; // id danh mục Tour Trong Nước
  const listCategoryId = await categoryHelper.getAllSubcategoryIds(categoryIdSection4);

  const tourListSection4 = await Tour
    .find({
      category: { $in: listCategoryId },
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(8)

  for(const item of tourListSection4) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  // End Section 4: Tour Trong Nước

  // Section 6: Tour Nước Ngoài
  const categoryIdSection6 = "67ff635de8b24035f0576ed3";
  const listCategoryIdSection6 = await categoryHelper.getAllSubcategoryIds(categoryIdSection6);

  const tourListSection6 = await Tour
    .find({
      category: { $in: listCategoryIdSection6 },
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(8);

  for (const item of tourListSection6) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  // End Section 6: Tour Nước Ngoài

    res.render("client/pages/home", {
      pageTitle: "Trang chủ",
      tourListSection2: tourListSection2,
      tourListSection4: tourListSection4,
      tourListSection6: tourListSection6
    })
  }
  