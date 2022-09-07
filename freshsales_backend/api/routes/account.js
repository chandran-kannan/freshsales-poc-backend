const express = require("express");
const { freshSalesApiKey } = require("../constants");
const router = express.Router();
var axios = require("axios").default;

router.get("/:accountId", async (req, res, next) => {
  console.log(req.params);
  try {
    const response = await axios.request({
      method: "GET",
      url: `https://chan-479317309613445146.myfreshworks.com/crm/sales/api/sales_accounts/${req.params.accountId}`,
      params: { include: "contacts" },
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Token token=${freshSalesApiKey}`
      }
    });
    res.status(200).json({
      ...response.data
    });
  } catch (error) {
    console.error(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    console.log(req.body);
    var options = {
      method: "PUT",
      url: `https://chan-479317309613445146.myfreshworks.com/crm/sales/api/sales_accounts/${req.body.accountId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${freshSalesApiKey}`
      },
      data: req.body.data
    };

    const response = await axios.request(options);
    res.status(200).json({
      success: true,
      data: {
        ...response.data
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// router.get("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   res.status(200).json({
//     message: "products fetched",
//     id: id,
//   });
// });

// router.post("/", (req, res, next) => {
//   res.status(200).json({
//     message: "product added",
//   });
// });

// router.patch("/", (req, res, next) => {
//   res.status(200).json({
//     message: "product patched",
//   });
// });

// router.delete("/", (req, res, next) => {
//   res.status(200).json({
//     message: "product deleted",
//   });
// });

module.exports = router;
