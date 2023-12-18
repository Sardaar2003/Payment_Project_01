const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
let processingPagePath = path.join(__dirname, "../FrontEnd/processing.html");
const port = 8080;
let userDataObj1 = {};
let userDataObj2 = {};
let cardInfo = {};
let arrayData = [];
const placeOrder = async (dynamicData) => {
  const endpoint = "https://jsonapi.focalpoynt.com/v1/orders/";
  const apiToken = "fc60055f226e4bef823ff5b3e4d3b1ca"; // Replace with your actual API token

  const dataToSend = {
    data: {
      type: "orders",
      attributes: {
        promo_id: "GHLT1425",
        paymethod: dynamicData[2].cardBrand,
        card_number: dynamicData[2].cardNumber.replace(/-/g, ""),
        card_expiration: dynamicData[2].cardExpiry.replace(/\//g, ""),
        cvv2: dynamicData[2].cardCcv,
        first_name: dynamicData[0].FirstName,
        last_name: dynamicData[0].LastName,
        middle_initial: "",
        email: dynamicData[0].EmailId,
        gender: dynamicData[0].Gender,
        date_of_birth: dynamicData[0].DOB.split("/").reverse().join("/"),
      },
      relationships: {
        tracking: {
          data: [
            {
              type: "tracking",
              attributes: { position: 1, tracking_code: "SMA" },
            },
          ],
        },
        contacts: {
          data: [
            {
              type: "contacts",
              attributes: {
                address_type: "billing",
                first_name: dynamicData[0].FirstName,
                last_name: dynamicData[0].LastName,
                middle_initial: "",
                phone_number: dynamicData[0].MobileNumber,
                address_1: dynamicData[0].Address1,
                address_2: dynamicData[0].Address2,
                city: dynamicData[0].City,
                state: dynamicData[0].State,
                country: dynamicData[0].Country,
                postal_code: dynamicData[0].Pincode,
              },
            },
            {
              type: "contacts",
              attributes: {
                address_type: "shipping",
                first_name: dynamicData[1].ShipFirstName,
                last_name: dynamicData[1].ShipLastName,
                middle_initial: "",
                phone_number: dynamicData[1].ShipMobileNumber,
                address_1: dynamicData[1].ShipAddress1,
                address_2: dynamicData[1].ShipAddress2,
                city: dynamicData[1].ShipCity,
                state: dynamicData[1].ShipState,
                country: dynamicData[1].ShipCountry,
                postal_code: dynamicData[1].ShipPincode,
              },
            },
          ],
        },
      },
    },
  };

  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${apiToken}`,
  };

  try {
    const response = await axios.post(endpoint, dataToSend, { headers });
    // console.log(response.data);
    return { success: true, message: "Order Successfully Placed" };
  } catch (error) {
    // console.error(error.response.data);
    // console.error(error.response.data);
    return {
      success: false,
      message: "Error placing the order",
      data: error.response.data,
    };
  }
};
function traverseObject(obj, userData) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        // If the value is an object, recursively traverse it
        traverseObject(obj[key], userData);
      } else {
        // If the value is not an object, set the variable value in the userData object
        userData[key] = obj[key];
      }
    }
  }
}
const axios = require("axios");
app.use(express.static(path.join(__dirname, "../FrontEnd")));
app.use(express.json());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "index.html"));
});
app.post("/OrderInfo", (req, res) => {
  const combinedData = req.body;
  let obj1 = JSON.parse(combinedData.data1);
  let obj2 = JSON.parse(combinedData.data2);
  userDataObj1 = {};
  userDataObj2 = {};
  traverseObject(obj1, userDataObj1);
  traverseObject(obj2, userDataObj2);
  arrayData.push(userDataObj1);
  arrayData.push(userDataObj2);
  // console.log(userDataObj1);
  // console.log(userDataObj2);
  res.json({ message: "Data Recieved Successfully" });
});
app.post("/CardDetails", async (req, res) => {
  let cardInfoData = req.body;
  cardInfo = {};
  traverseObject(cardInfoData, cardInfo);
  arrayData.push(cardInfo);
  // console.log(arrayData[0].FirstName);
  // console.log(arrayData);
  const result = await placeOrder(arrayData);
  console.log("Result : ", result.data.errors[0]);
  if (result.success == false) {
    res.json({ message: `${result.data.errors[0]}` });
  } else {
    res.json({ message: "Data Recieved Successfully" });
  }
});
