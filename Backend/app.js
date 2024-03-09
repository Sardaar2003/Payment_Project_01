// Storing the important and security related information
if (process.env.NODE_ENV !== "production") {
  const result = require("dotenv").config();
  if (result.error) {
    console.error("Error loading .env file:", result.error);
  }
}

// Importing the necessary
const express = require("express");
const excel = require("exceljs");
const fs = require("fs");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const flash = require("express-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./autheticationSchema");
const axios = require("axios");

// Acquiring the Schema
let {
  BillingData,
  ShippingData,
  UserData,
  CardData,
  Response,
} = require("./StorageData.js");

// MiddleWare Usage
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(path.join(__dirname, "../FrontEnd")));
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use((err, req, res, next) => {
  if (err.status === 400 || err.status === 500) {
    res.redirect("/genError") ||
      res.sendFile(ath.join(__dirname, "../FrontEnd", "generalError.html"));
  } else {
    next(err);
  }
});
app.set("views", path.join(__dirname, "..", "views"));
// Health Check Up
app.get("/healthCheck", (req, res) => {
  res.status(200).send("Server is Up and Running");
});

// Referal Code for running the data
const preDefinedReferalCode = [
  "diVySKAz0mO97MTwxZQ7",
  "0arKZcVV6b7s3AzI8HFj",
  "IqmaUX1vLtdAUgu3jP95",
  "yIilbsfQQVTYAZCxBehP",
  "cnWqB3cCrsW6CIpNQbIA",
  "rvOebZY2stSUa6Vwoo98",
  "SHrz88YXvsIL4hGkE8Fz",
  "ZpeYUyCLfGVn0q1xjQ3M",
  "JUsBHKQsvSKhN69ujyWq",
  "dGmgmAo75tBux8l94EpG",
];

// Connection with the database
const run = async () => {
  const MONG_URL = `mongodb+srv://singhmantej536:${process.env.MONGODBKEY}@paymentgate.rs63o6h.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(MONG_URL);
};
run()
  .then(() => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(`Failed to Connect ${err}`);
  });

// Checks for the valid ReferalCode
const checkReferralCode = (codeToCheck) => {
  return preDefinedReferalCode.includes(codeToCheck);
};

// Formats the data based on the US Time
const getFormattedTimestamp = () => {
  const now = new Date();

  // Options for formatting the date and time
  const options = {
    timeZone: "America/New_York", // Eastern Time Zone
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  // Format the date and time using toLocaleString
  return now.toLocaleString("en-US", options);
};

// API Call for Project 1
const placeOrder = async (dynamicData, req) => {
  const endpoint = "https://jsonapi.focalpoynt.com/v1/orders/";
  const apiToken = `${process.env.APITOKEN}`;

  const dataToSend = {
    data: {
      type: "orders",
      attributes: {
        promo_id: `${req.session.promo_ID}`,
        paymethod: dynamicData[2].cardBrand,
        card_number: dynamicData[2].cardNumber.replace(/-/g, ""),
        card_expiration: dynamicData[2].cardExpiry.replace(/\//g, ""),
        cvv2: dynamicData[2].cardCcv,
        first_name: dynamicData[0].FirstName,
        last_name: dynamicData[0].LastName,
        middle_initial: "",
        email: dynamicData[0].EmailId,
        gender: dynamicData[0].Gender,
        date_of_birth: dynamicData[0].DOB,
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

    return {
      success: true,
      message: "Order Successfully Placed",
      data: "Success",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error placing the order",
      data: error.response.data.errors,
    };
  }
};

//Autheticating the user
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Traversing the Object and storing it in the list
function traverseObject(obj, userData) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        traverseObject(obj[key], userData);
      } else {
        userData[key] = obj[key];
      }
    }
  }
}

// Saving the data on the database
async function saveData(req, arrayData, resp) {
  try {
    let BillingAdd = arrayData[0];
    let ShippingAdd = arrayData[1];
    let cardDetails = arrayData[2];
    const billingDoc = await BillingData.create(BillingAdd);
    const shippingDoc = await ShippingData.create(ShippingAdd);
    const cardDoc = await CardData.create(cardDetails);
    const respDoc = await Response.create({
      ResponseType: resp,
    });
    const userDoc = await UserData.create({
      User: req.user._id, // Assuming userDoc is available (you may need to adjust this based on your logic)
      billing: billingDoc._id,
      card: cardDoc._id,
      shipping: shippingDoc._id,
      response: respDoc._id,
    });
    console.log("Data saved:", userDoc);
  } catch (error) {
    console.log("Error saving data:", error);
  }
}

// Formatiing the date and time
function formatTimestampToDateString(timestampString) {
  // Parse the timestamp string to get a valid JavaScript Date object
  const date = new Date(timestampString);

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid timestamp string:", timestampString);
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    } else {
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }
  }

  const formattedDate = `${addOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
}

// Saving the entire infromation with the resposne to the database
const saveDataToMongoDB = async (
  arrayData,
  resp,
  usern,
  project,
  promo,
  req
) => {
  try {
    let existingLogEntry = await LogData.findOne({
      cardNumber: arrayData[2].cardNumber,
      mobileNumber: arrayData[0].MobileNumber,
      Attempt: "1",
    });

    let attempt = "1";
    if (existingLogEntry) {
      attempt = "2";
    }
    const [billing, shipping, card] = arrayData;
    billingInfo = {};
    traverseObject(billing, billingInfo);
    cardInfoPart = {};
    traverseObject(card, cardInfoPart);

    const logEntry = new LogData({
      timestamp: getFormattedTimestamp(),
      response: resp,
      username: usern.username,
      firstName: billingInfo.FirstName,
      lastName: billingInfo.LastName,
      gender: billingInfo.Gender,
      dateOfBirth: billingInfo.DOB,
      address1: billingInfo.Address1,
      address2: billingInfo.Address2,
      city: billingInfo.City,
      state: billingInfo.State,
      country: billingInfo.Country,
      pincode: billingInfo.Pincode,
      mobileNumber: billingInfo.MobileNumber,
      emailId: billingInfo.EmailId,
      cardNumber: cardInfoPart.cardNumber,
      cardExpiry: cardInfoPart.cardExpiry,
      cardCcv: cardInfoPart.cardCcv,
      cardBrand: cardInfoPart.cardBrand,
      Promo_ID: req.session.promo_ID,
      Promo_type:
        promo == "ID Vault" ||
        promo == "Holiday Savers Online" ||
        promo == "Savers Central Online"
          ? promo
          : req.session.promo_type,
      Project_Number: project,
      Attempt: attempt,
    });

    await logEntry.save();
    // arrayData = [];
    console.log("Log data saved to MongoDB.");
  } catch (error) {
    console.log("Error saving log data to MongoDB:", error);
  }
};

// Duplicacy Checking
const checkDuplicateEntry = async (promoId, cardNumber, phoneNum) => {
  try {
    // Perform a query to check for duplicates
    const existingEntry = await LogData.findOne({
      // Promo_ID: promoId,
      cardNumber: cardNumber,
      mobileNumber: phoneNum,
      response: "Success",
    });

    // If a duplicate entry is found, return true
    return !!existingEntry;
  } catch (error) {
    // Handle any errors during the database query
    console.error("Error checking for duplicate entry:", error);
    throw error; // Rethrow the error if needed
  }
};

// Schema Declaration :
const logDataSchema = new mongoose.Schema({
  timestamp: String,
  response: String,
  username: String,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  mobileNumber: String,
  emailId: String,
  cardNumber: String,
  cardExpiry: String,
  cardCcv: String,
  cardBrand: String,
  Promo_ID: String,
  Promo_type: String,
  Project_Number: String,
  Attempt: String,
});

//Attempts Checking :
const checkNumberOfAttempts = async (promoId, cardNumber, phoneNum) => {
  try {
    // Perform a query to check for duplicates
    const existingEntry1 = await LogData.countDocuments({
      // Promo_ID: promoId,
      cardNumber: cardNumber,
      mobileNumber: phoneNum,
    });
    console.log(existingEntry1);

    // If a duplicate entry is found, return true
    return existingEntry1 >= 2;
  } catch (error) {
    // Handle any errors during the database query
    console.error("Error checking for Number of Attempts entry:", error);
    throw error; // Rethrow the error if needed
  }
};

// Initalisation
const port = 8080 || process.env.port;
let userDataObj1 = {};
let userDataObj2 = {};
let cardInfo = {};
const LogData = mongoose.model("LogData", logDataSchema);
const apiUrl = "https://redeo.sublytics.com/api/order/doAddProcess";

// LogOut Protocol
app.get("/logoutOnUnload", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut((err) => {
      if (err) {
        console.log(err);
      }
      res.send("User logged out on page unload");
    });
  } else {
    res.send("User is not logged in");
  }
});

// Error handler
app.use((err, req, res, next) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "generalError.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "signUp.html"));
});

app.get("/card", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "header2.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "index.html"));
});

app.get("/new", isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../FrontEnd", "newPage.html"));
  } else {
    res.redirect("/home");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "loginPage.html"));
});

app.get("/main", isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../FrontEnd", "index1.html"));
  } else {
    res.redirect("/home");
  }
});

app.get("/Success", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "final.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "success.html"));
});

app.get("/Pending", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "InProgress.html"));
});

app.get("/failure", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "failure.html"));
});

app.get("/failDB", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "failureDB.html"));
});

// Checks for the login Data
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
    failureFlash: true,
  }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/new");
    } else {
      res.redirect("/login");
    }
  }
);

// Performs Logging Out
app.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/home");
  });
});

// Performs Sign Up of the user
app.post("/signUpDom", async (req, res) => {
  try {
    const { username, emailId, passWOrd, referralCd } = req.body;
    if (
      username !== undefined &&
      username !== "" &&
      emailId !== undefined &&
      emailId !== "" &&
      passWOrd !== undefined &&
      passWOrd !== "" &&
      referralCd !== undefined &&
      referralCd !== ""
    ) {
      const existingUserWithEmail = await User.findOne({ email: emailId });
      const existingUserWithUsername = await User.findOne({ username });
      if (existingUserWithEmail || existingUserWithUsername) {
        console.log("User with duplicate emailId or username already exists");
        res.redirect("/failDB");
        // Handle the duplicate case, perhaps by returning an error response.
      } else {
        const newUser = new User({ email: emailId, username });
        const registeredUser = await User.register(newUser, passWOrd);
        console.log(registeredUser);
        res.redirect("/success");
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid Data. Please check your input." });
    }
  } catch (error) {
    console.log("Error in signUp endpoint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Gets the necessary information
app.post("/OrderInfo", isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const combinedData = req.body;
    let obj1 = JSON.parse(combinedData.data1);
    let obj2 = JSON.parse(combinedData.data2);
    userDataObj1 = {};
    userDataObj2 = {};
    traverseObject(obj1, userDataObj1);
    traverseObject(obj2, userDataObj2);
    let arrayData = req.session.arrayData || [];
    arrayData = [];
    arrayData.push(userDataObj1);
    arrayData.push(userDataObj2);
    req.session.arrayData = arrayData;
    res.json({ message: "Data Recieved Successfully" });
  } else {
    req.redirect("/home");
  }
});

// Route to render the error page
app.get("/error", (req, res) => {
  res.render("error", { errors });
});

// Downloading the Project Report
app.get("/projectManagement", async (req, res) => {
  try {
    const authorizedUser = ["Sameer", "ashishrane", "Gurtej"];
    const userId = req.user._id; // Fetch all log data from MongoDB
    if (authorizedUser == userId) {
      // Fixed values
      const fixedValues = {
        accountVendorId: "DOC WELLNESS",
        paymentAmount: 9.95,
      };

      // Excel headers
      const headers = [
        "Sl. No.",
        "Account Vendor Id",
        "Account : Account Name",
        "Bill To: Work Phone",
        "Payment Effective Date",
        "Payment Amount",
        "Account : Product ID",
        "Account : Filename",
        "Status",
      ];

      // Create a new workbook and add a worksheet
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1", {
        properties: { tabColor: { argb: "FF00FF00" } },
      });

      // Add headers to the worksheet
      worksheet.addRow(headers);

      // Fetch dynamic data from the database (logData schema in this case)
      const data = await LogData.find({});

      // Populate the worksheet with dynamic data
      data.forEach((item, index) => {
        const rowData = [
          index + 1, // Sl. No.
          fixedValues.accountVendorId,
          item.firstName + " " + item.lastName,
          item.mobileNumber,
          formatTimestampToDateString(item.timestamp),
          fixedValues.paymentAmount,
          item.Promo_type == "HEALTH AND WELLNESS PROGRAM"
            ? "DOC WELLNESS-HEALTH PLAN"
            : "DOC WELLNESS-ID PROTECTION",
          item.Promo_type == "HEALTH AND WELLNESS PROGRAM" ? "DWH-1" : "DWI-1",
          item.response,
        ];

        worksheet.addRow(rowData);
      });

      // Generate a unique filename for the Excel file
      const fileName = `project_management_${Date.now()}.xlsx`;
      const filePath = `${__dirname}/${fileName}`;

      // Save the workbook to a file
      await workbook.xlsx.writeFile(filePath);

      // Set headers for Excel file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

      // Stream the file to the client
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      // Remove the generated file after streaming
      fileStream.on("end", () => {
        fs.unlinkSync(filePath);
      });
    } else {
      res.sendFile(path.join(__dirname, "../FrontEnd", "NotEligible.html"));
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Downloading the Report
app.get("/insertDataAndDownload", async (req, res) => {
  try {
    const authorizedUser = ["Sameer", "ashishrane", "Gurtej"];
    const userId = req.user._id; // Fetch all log data from MongoDB
    if (authorizedUser.includes(userId)) {
      const allLogData = await LogData.find();
      // Create a new workbook and add a worksheet
      const workbook = new excel.Workbook();
      const sheetName = "Log Data";
      const worksheet = workbook.addWorksheet(sheetName, {
        properties: { tabColor: { argb: "FF00FF00" } },
      });
      // Add headers for the worksheet
      const headers = [
        "Timestamp",
        "Response",
        "Username",
        "FIRST NAME",
        "LAST NAME",
        "GENDER",
        "DATE OF BIRTH",
        "ADDRESS 1",
        "ADDRESS 2",
        "CITY",
        "STATE",
        "COUNTRY",
        "ZIPCODE",
        "MOBILE NUMBER",
        "EMAIL ID",
        "CARD NUMBER",
        "EXPIRY DATE",
        "CCV",
        "CARD BRAND",
        "PROMO_TYPE",
        "PROJECT NUMBER",
        "Attempt Number",
      ];
      worksheet.addRow(headers);
      // Insert log data into the worksheet
      allLogData.forEach((logEntry) => {
        const values = [
          logEntry.timestamp,
          logEntry.response,
          logEntry.username,
          logEntry.firstName,
          logEntry.lastName,
          logEntry.gender,
          logEntry.dateOfBirth,
          logEntry.address1,
          logEntry.address2,
          logEntry.city,
          logEntry.state,
          logEntry.country,
          logEntry.pincode,
          logEntry.mobileNumber,
          logEntry.emailId,
          logEntry.cardNumber,
          logEntry.cardExpiry,
          logEntry.cardCcv,
          logEntry.cardBrand,
          logEntry.Promo_type,
          logEntry.Project_Number,
          logEntry.Attempt,
        ];
        worksheet.addRow(values);
      });
      // Set the response headers to trigger download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=LogData.xlsx");
      // Write the workbook to the response
      await workbook.xlsx.write(res);
      console.log("Excel file sent as response.");
    } else {
      res.sendFile(path.join(__dirname, "../FrontEnd", "NotEligible.html"));
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error Page
app.get("/getInfo", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "errorPage.html"));
});

//General Error Page
app.get("/genError", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "generalError.html"));
});

// Entire API Request Processess
app.post("/CardDetails", async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user._id != undefined) {
      let cardInfoData = req.body;
      let arrayData = req.session.arrayData || [];
      cardInfo = {};
      traverseObject(cardInfoData, cardInfo);
      arrayData.push(cardInfo);
      req.session.arrayData = arrayData;
      req.session.promo_ID = cardInfo.promo_id;
      let number = req.session.arrayData[2].cardNumber;
      let phoneNum = req.session.arrayData[0].MobileNumber;
      let flag = false;

      if (req.session.promo_ID.includes("/")) {
        if (
          req.session.arrayData[0].State == "IA" ||
          req.session.arrayData[0].State == "MN" ||
          req.session.arrayData[0].State == "VT" ||
          req.session.arrayData[0].State == "WI"
        ) {
          res.json({
            message: "Error State not Valid",
          });
        } else {
          let parts = req.session.promo_ID.split("/");
          let number1 = parseInt(parts[0], 10);
          let number2 = parseInt(parts[1], 10);
          let stringPart = parts[2];
          data = req.session.arrayData[2].cardExpiry.replace(/\//g, "");
          var firstTwoDigits = parseInt(data.substring(0, 2));
          var lastTwoDigits = parseInt(data.substring(data.length - 2));
          console.log("Phone Number : ", phoneNum);
          console.log("Number : ", number);
          if (
            await checkNumberOfAttempts(req.session.promo_ID, number, phoneNum)
          ) {
            res.json({ message: "Maximum Attempts Reached" });
            return;
          } else {
            const requestData = {
              user_id: `${process.env.USR_ID}`,
              user_password: `${process.env.USR_PWD}`,
              connection_id: 1,
              payment_method_id: 1, // Fixed at 1
              campaign_id: number1,
              offers: [
                {
                  offer_id: number2,
                  order_offer_quantity: 1,
                },
              ],
              email: req.session.arrayData[0].EmailId,
              phone: req.session.arrayData[0].MobileNumber,
              bill_fname: req.session.arrayData[0].FirstName,
              bill_lname: req.session.arrayData[0].LastName,
              bill_country: "US",
              bill_address1: req.session.arrayData[0].Address1,
              bill_address2: req.session.arrayData[0].Address2,
              bill_city: req.session.arrayData[0].City,
              bill_state: req.session.arrayData[0].State,
              bill_zipcode: req.session.arrayData[0].Pincode,
              shipping_same: true, // Is the shipping address same as the billing address
              card_type_id:
                req.session.arrayData[2].cardBrand == "MC"
                  ? 1
                  : req.session.arrayData[2].cardBrand == "VS"
                  ? 2
                  : req.session.arrayData[2].cardBrand == "DS"
                  ? 3
                  : req.session.arrayData[2].cardBrand == "AX"
                  ? 4
                  : -1,
              card_number: req.session.arrayData[2].cardNumber.replace(
                /-/g,
                ""
              ),
              card_cvv: parseInt(req.session.arrayData[2].cardCcv),
              card_exp_month: firstTwoDigits,
              card_exp_year: lastTwoDigits,
            };
            try {
              const response = await axios.post(apiUrl, requestData);
              saveDataToMongoDB(
                req.session.arrayData,
                "Success",
                req.user,
                "Project_02",
                stringPart == "SC"
                  ? "Savers Central Online"
                  : stringPart == "HS"
                  ? "Holiday Savers Online"
                  : "ID Vault",
                req
              );
              return res.json({ message: "Data Recieved Successfully" });
            } catch (error) {
              if (error.response) {
                saveDataToMongoDB(
                  req.session.arrayData,
                  "Failure",
                  req.user,
                  "Project_02",
                  stringPart == "SC"
                    ? "Savers Central Online"
                    : stringPart == "HS"
                    ? "Holiday Savers Online"
                    : "ID Vault",
                  req
                );
                res.json({
                  message: "Data not Receieved",
                  Error: error.response.data.message,
                });
              } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:");
                res.json({ message: "Error Occured Response Not Received" });
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error:");
                res.json({ message: "Error Occured Triggered by response" });
              }
              return {
                success: false,
                message: "Error placing the order",
                error: error.response
                  ? error.response.data
                  : "No response from server",
              };
            }
          }
        }
      } else {
        if (req.session.promo_ID == "GHLT1425")
          req.session.promo_type = "HEALTH AND WELLNESS PROGRAM";
        else req.session.promo_type = "PROTECTION PROGRAM";
        delete cardInfo.promo_id;
        console.log("Phone Number : ", phoneNum);
        console.log("Number : ", number);
        let isDuplicate = await checkDuplicateEntry(
          req.session.promo_ID,
          number,
          phoneNum
        );
        if (isDuplicate == false) {
          let attemptsData = await checkNumberOfAttempts(
            req.session.promo_ID,
            number,
            phoneNum
          );
          console.log(attemptsData);
          if (attemptsData == false) {
            try {
              const result = await placeOrder(req.session.arrayData, req);
              console.log(result.data);
              if (result.success == true && result.data == "Success") {
                saveData(req, req.session.arrayData, "Success");
                saveDataToMongoDB(
                  req.session.arrayData,
                  "Success",
                  req.user,
                  "Project_01",
                  "",
                  req
                );
                res.json({ message: "Data Recieved Successfully" });
              } else {
                saveDataToMongoDB(
                  req.session.arrayData,
                  "Failure",
                  req.user,
                  "Project_01",
                  "",
                  req
                );
                res.json({
                  message: "Data not Receieved",
                  Error: result.data,
                });
              }
            } catch (err) {
              console.log("Error Occured While Placing Orders ");
              res.json({ message: "Error Occured While Placing Orders" });
            }
          } else {
            res.json({ message: "Maximum Attempts Reached" });
          }
        } else {
          res.json({ message: "Duplicate Elements" });
        }
      }
    }
  } catch (err) {
    console.log("Error Occured while executing the code : ");
    res.json({ message: "Error Occured while Executing the code" });
  }
});
