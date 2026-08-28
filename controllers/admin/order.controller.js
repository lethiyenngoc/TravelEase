const Order = require("../../models/order.model");
const City = require("../../models/city.model");
const variableConfig = require("../../config/variable");
const moment = require("moment");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false
  };

  // Lọc trạng thái đơn hàng
  if(req.query.status) {
    find.status = req.query.status;
  }

  // Lọc phương thức thanh toán
  if(req.query.paymentMethod) {
    find.paymentMethod = req.query.paymentMethod;
  }

  // Lọc trạng thái thanh toán
  if(req.query.paymentStatus) {
    find.paymentStatus = req.query.paymentStatus;
  }

  // Lọc ngày đặt
  const dateFilter = {};

  if(req.query.startDate) {
    dateFilter.$gte = moment(req.query.startDate).startOf("date").toDate();
  }

  if(req.query.endDate) {
    dateFilter.$lte = moment(req.query.endDate).endOf("date").toDate();
  }

  if(Object.keys(dateFilter).length > 0) {
    find.createdAt = dateFilter;
  }

  // Tìm kiếm theo mã đơn, họ tên, số điện thoại
  if(req.query.keyword) {
    const keywordRegex = new RegExp(req.query.keyword.trim(), "i");

    find.$or = [
      { orderCode: keywordRegex },
      { fullName: keywordRegex },
      { phone: keywordRegex },
      { "items.name": keywordRegex }
    ];
  }

 // Phân trang
  const limitItems = 5;
  let page = 1;

  if (req.query.page) {
    const currentPage = parseInt(req.query.page);
    if (currentPage > 0) page = currentPage;
  }

  const totalRecord = await Order.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems) || 1;

  if (page > totalPage) page = totalPage;

  const skip = (page - 1) * limitItems;

  const pagination = {
    currentPage: page,
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage
  };
  // Hết phân trang

  const orderList = await Order
    .find(find)
    .sort({
      createdAt: "desc"
    })
    .limit(limitItems)
    .skip(skip);

  for (const orderDetail of orderList) {
    orderDetail.paymentMethodName = variableConfig.paymentMethod.find(item => item.value == orderDetail.paymentMethod).label;
    
    orderDetail.paymentStatusName = variableConfig.paymentStatus.find(item => item.value == orderDetail.paymentStatus).label;

    orderDetail.statusName = variableConfig.orderStatus.find(item => item.value == orderDetail.status).label;

    orderDetail.createdAtTime = moment(orderDetail.createdAt).format("HH:mm");
    orderDetail.createdAtDate = moment(orderDetail.createdAt).format("DD/MM/YYYY");
  }

  res.render("admin/pages/order-list", {
    pageTitle: "Quản lý đơn hàng",
    orderList: orderList,
    pagination: pagination,
    paymentMethod: variableConfig.paymentMethod,
    paymentStatus: variableConfig.paymentStatus,
    orderStatus: variableConfig.orderStatus
  })
}
  
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const orderDetail = await Order.findOne({
      _id: id,
      deleted: false
    })

    orderDetail.createdAtFormat = moment(orderDetail.createdAt).format("YYYY-MM-DDTHH:mm");

    for (const item of orderDetail.items) {
      const city = await City.findOne({
        _id: item.locationFrom
      });
      item.locationFromName = city.name;
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
    }

  res.render("admin/pages/order-edit", {
      pageTitle: `Đơn hàng: ${orderDetail.orderCode}`,
      orderDetail: orderDetail,
      paymentMethod: variableConfig.paymentMethod,
      paymentStatus: variableConfig.paymentStatus,
      orderStatus: variableConfig.orderStatus
    })
  } catch (error) {
    res.redirect(`/${pathAdmin}/order/list`);
  }
}

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findOne({
      _id: id,
      deleted: false
    });

    if(!order) {
      res.json({
        code: "error",
        message: "Thông tin đơn hàng không hợp lệ!"
      })
      return;
    }

    await Order.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    req.flash("success", "Cập nhật đơn hàng thành công!");

    res.json({
      code: "success"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Thông tin đơn hàng không hợp lệ!"
    })
  }
} 

module.exports.deletePatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now()
    });

    req.flash("success", "Xóa đơn hàng thành công!");

    res.json({
      code: "success"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Thông tin đơn hàng không hợp lệ!"
    })
  }
}

module.exports.loyalCustomerList = async (req, res) => {
  const loyalCustomerList = await Order.aggregate([
    {
      $match: {
        deleted: false,
        status: "done",
        paymentStatus: "paid"
      }
    },
    {
      $group: {
        _id: "$phone",
        fullName: { $first: "$fullName" },
        phone: { $first: "$phone" },
        totalOrder: { $sum: 1 },
        totalMoney: { $sum: "$total" }
      }
    },
    {
      $match: {
        $or: [
          { totalOrder: { $gte: 3 } },
          { totalMoney: { $gte: 5000000 } }
        ]
      }
    },
    {
      $sort: {
        totalMoney: -1
      }
    }
  ])

  res.render("admin/pages/order-loyal-customer-list", {
    pageTitle: "Khách hàng thân thiết",
    loyalCustomerList: loyalCustomerList
  })
}

module.exports.invoice = async (req, res) => {
  try {
    const id = req.params.id;

    const orderDetail = await Order.findOne({
      _id: id,
      deleted: false
    })

    if(!orderDetail) {
      res.redirect(`/${pathAdmin}/order/list`);
      return;
    }

    orderDetail.paymentMethodName = variableConfig.paymentMethod.find(item => item.value == orderDetail.paymentMethod).label;
    orderDetail.paymentStatusName = variableConfig.paymentStatus.find(item => item.value == orderDetail.paymentStatus).label;
    orderDetail.statusName = variableConfig.orderStatus.find(item => item.value == orderDetail.status).label;

    orderDetail.createdAtTime = moment(orderDetail.createdAt).format("HH:mm");
    orderDetail.createdAtDate = moment(orderDetail.createdAt).format("DD/MM/YYYY");

    res.render("admin/pages/order-invoice", {
      pageTitle: `Hóa đơn ${orderDetail.orderCode}`,
      orderDetail: orderDetail
    })
  } catch (error) {
    res.redirect(`/${pathAdmin}/order/list`);
  }
}