const express = require("express");
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
  const MONG_URL =
    "mongodb+srv://singhmantej536:may8dWkKK00se71F@paymentgate.rs63o6h.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(MONG_URL);
};
run()
  .then(() => {
    console.log(`Connected to DB`);
  })
  .catch((err) => {
    console.log(`Failed to Connect`);
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
app.post("/CardDetails", async (req, res) => {
  if (req.isAuthenticated() && req.user._id != undefined) {
    let cardInfoData = req.body;

    // console.log(req.body);
    cardInfo = {};
    traverseObject(cardInfoData, cardInfo);
    arrayData.push(cardInfo);
    // console.log(arrayData);
    const result = await placeOrder(arrayData);
    console.log("Result : ", result);
    if (result.success == false) {
      saveData(req, arrayData, "Failure");
      res.json({ message: "Data not Receieved" });
    } else {
      saveData(req, arrayData, "Success");
      res.json({ message: "Data Recieved Successfully" });
    }
  } else {
    req.redirect("/home");
  }
});
