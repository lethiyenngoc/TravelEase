const router = require('express').Router();

const orderController = require("../../controllers/admin/order.controller");

router.get('/list', orderController.list)

router.get('/edit/:id', orderController.edit)

router.get('/invoice/:id', orderController.invoice)

router.patch('/edit/:id', orderController.editPatch)

router.patch('/delete/:id', orderController.deletePatch)

router.get('/loyal-customer/list', orderController.loyalCustomerList)

module.exports = router;