if (process.env.NODE_ENV !== "production") {
  const result = require("dotenv").config();
  if (result.error) {
    console.error("Error loading .env file:", result.error);
  }
}
let promo_ID;
// console.log(process.env.MONGODBKEY);
// console.log(process.env.APITOKEN);
const express = require("express");
const excel = require("exceljs");
const fs = require("fs");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const flash = require("express-flash");
let processingPagePath = path.join(__dirname, "../FrontEnd/processing.html");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./autheticationSchema");
let {
  BillingData,
  ShippingData,
  UserData,
  CardData,
  Response,
} = require("./StorageData.js");
app.use(require("cookie-parser")());

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.use(flash());

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
// const MONG_URL = "mongodb://127.0.0.1:27017/InformationData";

const run = async () => {
  const MONG_URL = `mongodb+srv://singhmantej536:iIzxGIOb3eDaoCPx@paymentgate.rs63o6h.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(MONG_URL);
};
run()
  .then(() => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(`Failed to Connect ${err}`);
  });
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = 8080 || process.env.port;
let userDataObj1 = {};
let userDataObj2 = {};
let cardInfo = {};
let arrayData = [];
const placeOrder = async (dynamicData) => {
  const endpoint = "https://jsonapi.focalpoynt.com/v1/orders/";
  const apiToken = `fc60055f226e4bef823ff5b3e4d3b1ca`; // Replace with your actual API token

  const dataToSend = {
    data: {
      type: "orders",
      attributes: {
        promo_id: `${promo_ID}`,
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
    // console.log(response.data);
    return { success: true, message: "Order Successfully Placed" };
  } catch (error) {
    // console.error(error.response.data);
    // console.error(error.response.data);
    return {
      success: false,
      message: "Error placing the order",
      data: error.response,
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
const axios = require("axios");
app.use(express.static(path.join(__dirname, "../FrontEnd")));
app.use(express.json());
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/signUp", (req, res) => {
  // res.send("Form SignUp");
  res.sendFile(path.join(__dirname, "../FrontEnd", "signUp.html"));
});
app.get("/card", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "header2.html"));
});
app.get("/home", (req, res) => {
  // console.log(path.join(__dirname, "../FrontEnd", "entryPage.html"));
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
const checkReferralCode = (codeToCheck) => {
  return preDefinedReferalCode.includes(codeToCheck);
};
const checkSessionExpiration = (req, res, next) => {
  if (req.isAuthenticated() && req.session.cookie.expires < Date.now()) {
    req.logout();
  }
  next();
};

app.use(checkSessionExpiration);

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
app.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/home");
  });
});
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
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
      // console.log(existingUserWithEmail);
      const existingUserWithUsername = await User.findOne({ username });
      // console.log(existingUserWithUsername);

      if (existingUserWithEmail || existingUserWithUsername) {
        console.log("User with duplicate emailId or username already exists");
        // res.json({ message: "Error" });
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
    console.error("Error in signUp endpoint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/OrderInfo", isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
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
  } else {
    req.redirect("/home");
  }
});
async function saveData(req, arrayData, resp) {
  try {
    // console.log(typeof arrayData[0]);
    let BillingAdd = arrayData[0];
    // console.log(typeof arrayData[1]);
    let ShippingAdd = arrayData[1];
    let cardDetails = arrayData[2];
    console.log(BillingAdd);
    console.log(ShippingAdd);
    console.log(cardDetails);
    console.log(resp);
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
    console.error("Error saving data:", error);
  }
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
// Route to render the error page
app.get("/error", (req, res) => {
  res.render("error", { errors });
});
const getFormattedTimestamp = () => {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};
// const loadExistingData = () => {
//   const fileName = path.join(__dirname, "logs", "logData.xlsx");
//   if (fs.existsSync(fileName)) {
//     const workbook = new excel.Workbook();
//     workbook.xlsx.readFile(fileName);

//     // Get the first worksheet or create a new one
//     const worksheet =
//       workbook.getWorksheet(1) || workbook.addWorksheet("Log Data");

//     const headers = worksheet.getRow(1).values;
//     const arrayData = [];

//     for (let i = 2; i <= worksheet.rowCount; i++) {
//       const rowData = worksheet.getRow(i).values;
//       const entry = {};
//       headers.forEach((header, index) => {
//         entry[header] = rowData[index];
//       });
//       arrayData.push(entry);
//     }

//     return arrayData;
//   }
//   return [];
// };
// const updateExcelWithNewData = (newData, resp, usern) => {
//   // Combine new data with existing data (if any)
//   const arrayData = loadExistingData();

//   // // Update arrayData with new data
//   arrayData.push(...newData);

//   // Create the logs directory if it doesn't exist
//   const logsDirectory = path.join(__dirname, "logs");
//   if (!fs.existsSync(logsDirectory)) {
//     fs.mkdirSync(logsDirectory);
//   }
//   // const logsFile = path.join(__dirname, "logs");
//   const fileName = path.join(logsDirectory, "logData.xlsx");

//   // Create a new workbook and add a worksheet
//   const workbook = new excel.Workbook();
//   const sheetName = "Log Data";
//   const worksheet = workbook.addWorksheet(sheetName, {
//     properties: { tabColor: { argb: "FF00FF00" } },
//   });

//   // Add headers for the new worksheet
//   const headers = [
//     "Timestamp",
//     "Response",
//     "Username",
//     "FIRST NAME",
//     "LAST NAME",
//     "GENDER",
//     "DATE OF BIRTH",
//     "ADDRESS 1",
//     "ADDRESS 2",
//     "CITY",
//     "STATE",
//     "COUNTRY",
//     "PINCODE",
//     "MOBILE NUMBER",
//     "EMAIL ID",
//     "CARD NUMBER",
//     "EXPIRY DATE",
//     "CCV",
//     "CARD BRAND",
//   ];
//   worksheet.addRow(headers);
//   let tmstamp = getFormattedTimestamp();
//   // Insert data into the worksheet
//   const values = [
//     tmstamp,
//     resp,
//     usern.username,
//     arrayData[0].FirstName,
//     arrayData[0].LastName,
//     arrayData[0].Gender,
//     arrayData[0].DOB,
//     arrayData[0].Address1,
//     arrayData[0].Address2,
//     arrayData[0].City,
//     arrayData[0].State,
//     arrayData[0].Country,
//     arrayData[0].Pincode,
//     arrayData[0].MobileNumber,
//     arrayData[0].EmailId,
//     arrayData[2].cardNumber,
//     arrayData[2].cardExpiry,
//     arrayData[2].cardCcv,
//     arrayData[2].cardBrand,
//   ];
//   worksheet.addRow(values);

//   // Save the updated workbook to the file
//   // const fileName = path.join(logsDirectory, "logData.xlsx");
//   workbook.xlsx
//     .writeFile(fileName)
//     .then(() => {
//       console.log("Excel file updated successfully.");
//     })
//     .catch((err) => {
//       console.error("Error updating Excel file:", err);
//     });
// };
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
});
const LogData = mongoose.model("LogData", logDataSchema);
const saveDataToMongoDB = async (arrayData, resp, usern) => {
  try {
    const [billing, shipping, card] = arrayData;

    const logEntry = new LogData({
      timestamp: getFormattedTimestamp(),
      response: resp,
      username: usern.username,
      firstName: billing.FirstName,
      lastName: billing.LastName,
      gender: billing.Gender,
      dateOfBirth: billing.DOB,
      address1: billing.Address1,
      address2: billing.Address2,
      city: billing.City,
      state: billing.State,
      country: billing.Country,
      pincode: billing.Pincode,
      mobileNumber: billing.MobileNumber,
      emailId: billing.EmailId,
      cardNumber: card.cardNumber,
      cardExpiry: card.cardExpiry,
      cardCcv: card.cardCcv,
      cardBrand: card.cardBrand,
    });

    await logEntry.save();

    console.log("Log data saved to MongoDB.");
  } catch (error) {
    console.error("Error saving log data to MongoDB:", error);
  }
};
app.get("/insertDataAndDownload", async (req, res) => {
  try {
    // Fetch all log data from MongoDB
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
      "PINCODE",
      "MOBILE NUMBER",
      "EMAIL ID",
      "CARD NUMBER",
      "EXPIRY DATE",
      "CCV",
      "CARD BRAND",
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
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/CardDetails", async (req, res) => {
  if (req.isAuthenticated() && req.user._id != undefined) {
    let cardInfoData = req.body;

    console.log(req.body);
    cardInfo = {};
    traverseObject(cardInfoData, cardInfo);
    promo_ID = cardInfo.promo_id;
    // console.log(promo);
    delete cardInfo.promo_id;
    // console.log(cardInfo);
    arrayData.push(cardInfo);

    console.log(arrayData);
    // console.log(arrayData[0].DOB.split("/").reverse().join("/"));
    const result = await placeOrder(arrayData);
    console.log(result);
    // console.log("Result : ", result.data.data.errors);
    try {
      const errors = result.data.data.errors;
      console.log(errors);
    } catch (err) {
      console.log("Error Occured");
    }

    if (result.success == false) {
      // updateExcelWithNewData(arrayData, "Failure", req.user);
      // saveData(req, arrayData, "Failure");
      saveDataToMongoDB(arrayData, "Failure", req.user);
      res.json({
        message: "Data not Receieved",
        Error: result.data.data.errors,
      });
    } else {
      saveData(req, arrayData, "Success");
      saveDataToMongoDB(arrayData, "Success", req.user);
      res.json({ message: "Data Recieved Successfully" });
    }
  } else {
    res.redirect("/home");
  }
});
