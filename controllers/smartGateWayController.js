const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const {
  SmartGatewayCredential,
  StartTestQuestion,
  UserTestSeriesQuestion,
  User,
} = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require('axios')
const apiFeature = require("../utils/apiFeaturesSequelize");
const { v4 } = require("uuid");
/* 
    @desc Create QuestionReport
    @route POST /api/v1/questionReport/create
    @access private
**/
exports.submitPayment = catchAsync(async (req, res, next) => {


  
 
  let data = {
    OrderRemarks: "pencil",
    Amount: 10000,
    MerchantTransactionID: v4()
  };

  // let settings = {
  //   async: true,
  //   crossDomain: true,
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   processData: false,
  //   data: JSON.stringify(data),
  // };

  axios
    .post(`https://apisandbox.thesmartgateway.com:8080/pay/?api_key=cd919528bd9e7acf4d26c295247192987d1a7udi`, data)
    .then(async function (response) {
      console.log("fromasdasdsa", response)
      res.status(200).json({
        status: "success",
        data: response.data ,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.status(400).json({
        status: "fail",
        data:  error,
      });
      
    })
    .then(function () {
      // always executed
    });

  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   });
});
