// Storing the important and security related information
if (process.env.NODE_ENV !== "production") {
  const result = require("dotenv").config();
  if (result.error) {
    console.error("Error loading .env file:", result.error);
  }
}
// Importing the necessary
const fetch = require("cross-fetch");
const xmlbuilder = require("xmlbuilder");
// const { parseStringPromise } = require("xml2js");
const util = require("util");
const parseString = util.promisify(require("xml2js").parseString);
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
let binReject = [
  371291, 372741, 372742, 374326, 374327, 374328, 375150, 375151, 375171,
  376740, 377214, 377772, 379016, 379039, 400046, 400123, 400344, 400548,
  400768, 401356, 401366, 401523, 401524, 401535, 402018, 402055, 402642,
  402711, 402712, 403446, 403447, 403905, 403995, 404621, 404646, 404654,
  405302, 405482, 405731, 405825, 405960, 406032, 406042, 406068, 406498,
  407110, 407204, 407441, 407442, 407444, 407535, 407714, 407941, 410039,
  410106, 410489, 410808, 410809, 411111, 411770, 411773, 411774, 411776,
  412160, 413574, 414397, 414398, 414401, 414403, 414665, 414709, 414776,
  414780, 416422, 416725, 416860, 416992, 416993, 416994, 416995, 417094,
  418307, 419504, 420320, 420495, 420719, 420767, 420790, 422394, 422570,
  422676, 423145, 423223, 424242, 425031, 425032, 425054, 425522, 425603,
  425628, 426937, 426938, 428191, 429117, 429435, 430223, 430325, 430390,
  430594, 430679, 430731, 430763, 431568, 431719, 431732, 432626, 432857,
  433719, 434493, 434769, 434769, 435167, 435276, 435549, 435603, 435643,
  435740, 435858, 435877, 435880, 435888, 435970, 436802, 436879, 436884,
  437303, 437304, 437306, 437307, 437309, 438092, 438864, 439347, 439457,
  439461, 440393, 440452, 441482, 441686, 441896, 442062, 442554, 442657,
  442756, 444083, 445785, 447091, 447404, 447416, 447470, 447913, 447995,
  448210, 449163, 449274, 450455, 451062, 451129, 451440, 451805, 454507,
  455172, 456527, 456534, 456628, 456720, 457431, 458415, 459061, 460697,
  460699, 461046, 461235, 462795, 463491, 463506, 463576, 464733, 464808,
  465387, 466008, 466148, 466189, 466309, 467339, 468490, 469208, 469498,
  470134, 471529, 471724, 471830, 471849, 473622, 473690, 473691, 473910,
  474472, 474473, 474474, 474475, 474476, 474477, 474478, 474480, 474481,
  474487, 474488, 475006, 475013, 475015, 475056, 475427, 475431, 475598,
  475675, 475693, 476165, 476475, 476972, 476975, 478200, 478499, 479841,
  479851, 479853, 480128, 480151, 480152, 481582, 481583, 481774, 481775,
  482163, 483304, 483312, 483313, 483314, 483316, 483316, 483365, 483493,
  484224, 484718, 484735, 485245, 485246, 485279, 485320, 485340, 485398,
  485620, 486236, 486742, 486796, 487093, 489222, 489614, 489747, 491277,
  491968, 493435, 494159, 494160, 498403, 498404, 510277, 510380, 510392,
  510587, 510659, 510684, 510702, 510705, 510715, 510747, 510774, 510776,
  510780, 510782, 510796, 510805, 510805, 510840, 510848, 510875, 510888,
  510894, 510921, 510942, 510971, 510981, 510985, 511020, 511021, 511039,
  511040, 511066, 511082, 511089, 511100, 511118, 511122, 511137, 511152,
  511165, 511168, 511174, 511183, 511186, 511196, 511271, 511295, 511308,
  511317, 511321, 511340, 511361, 511368, 511388, 511418, 511455, 511457,
  511458, 511476, 511516, 511558, 511559, 511560, 511563, 511565, 511773,
  511786, 511813, 511858, 511905, 511941, 511960, 512025, 512027, 512106,
  512106, 512107, 512423, 512605, 512662, 512734, 512737, 512773, 512829,
  512837, 512913, 512951, 512991, 512992, 512993, 513237, 513503, 513521,
  513638, 513872, 513876, 513897, 514021, 514161, 514181, 514192, 514195,
  514210, 514230, 514253, 514378, 514402, 514450, 514494, 514518, 514594,
  514616, 514621, 514694, 514735, 514736, 514736, 514741, 514752, 514759,
  514798, 514810, 514812, 514816, 514839, 514846, 514863, 514865, 514887,
  514888, 514891, 514891, 514974, 514986, 514987, 514997, 515002, 515042,
  515068, 515147, 515158, 515189, 515241, 515248, 515255, 515260, 515307,
  515328, 515334, 515462, 515478, 515519, 515549, 515551, 515592, 515593,
  515597, 515599, 515676, 515735, 515746, 515927, 515936, 515952, 516075,
  516289, 516338, 516488, 516497, 516501, 516511, 516591, 516612, 516648,
  516648, 516693, 516988, 517057, 517223, 517274, 517278, 517426, 517545,
  517546, 517547, 517572, 517669, 517760, 517800, 517805, 517862, 517906,
  517952, 517996, 518213, 518221, 518408, 518444, 518717, 518726, 518752,
  518919, 519269, 519280, 519282, 519285, 519470, 519517, 519661, 519667,
  519669, 519833, 519845, 519880, 519882, 519911, 519955, 520094, 520101,
  520118, 520129, 520268, 520583, 520602, 520611, 521044, 521134, 521331,
  521333, 521403, 521409, 521507, 521531, 521639, 521730, 521745, 521844,
  521853, 521997, 522095, 522120, 522131, 522535, 522918, 522977, 523465,
  523668, 523694, 523754, 523762, 523815, 523820, 523827, 523852, 523862,
  523914, 523917, 524038, 524049, 524300, 524302, 524306, 524324, 524363,
  524364, 524366, 524408, 524430, 524550, 524570, 524860, 524866, 524901,
  524905, 524924, 525437, 525475, 525478, 525650, 525986, 526102, 526174,
  526218, 526218, 526219, 526219, 526221, 526222, 526223, 526225, 526225,
  526226, 526227, 526229, 526291, 526293, 526474, 526924, 526929, 527044,
  527355, 527368, 527395, 527513, 527515, 527516, 527517, 527518, 527519,
  527520, 527521, 527522, 527523, 527690, 527779, 528035, 528071, 528072,
  528197, 528209, 528210, 528281, 528436, 528469, 528497, 528546, 528556,
  528607, 528726, 528740, 528749, 528757, 528852, 528942, 529107, 529115,
  529149, 529188, 529262, 529263, 529288, 530046, 530048, 530072, 530088,
  530226, 530320, 530327, 530332, 530484, 530511, 530767, 530817, 531098,
  531103, 531105, 531106, 531108, 531109, 531202, 531254, 531255, 531256,
  531257, 531258, 531259, 531260, 531261, 531262, 531265, 531266, 531348,
  531462, 531475, 531903, 531904, 531942, 532030, 532152, 532254, 532318,
  532480, 532481, 532502, 532561, 532569, 532828, 532904, 532990, 533248,
  533303, 533355, 533414, 534466, 534482, 534636, 534730, 534740, 534857,
  534869, 534871, 534875, 534884, 536013, 536071, 536092, 536100, 536218,
  536219, 536226, 536291, 536293, 536314, 536425, 536718, 536720, 536759,
  536811, 536821, 536875, 536919, 537664, 537800, 537802, 537811, 538051,
  538066, 538068, 538072, 538080, 538897, 539277, 539634, 539639, 539640,
  539645, 539647, 539652, 539654, 539655, 539656, 539675, 539682, 539682,
  539738, 539792, 539807, 539842, 539843, 539855, 539860, 539870, 539880,
  539882, 539923, 539983, 540083, 540168, 540311, 540324, 540385, 540404,
  540501, 540539, 540598, 540633, 540656, 540662, 540707, 540789, 540791,
  540800, 540801, 540803, 540816, 540840, 541005, 541058, 541065, 541111,
  541413, 541660, 541772, 541887, 541931, 542000, 542217, 542256, 542326,
  542379, 542418, 542432, 542477, 542598, 542837, 542844, 542891, 542959,
  542964, 543069, 543158, 543276, 543284, 543296, 543328, 543347, 543352,
  543360, 543362, 543389, 543440, 543465, 543601, 543668, 543700, 543701,
  543831, 543849, 543957, 543963, 544045, 544113, 544183, 544303, 544303,
  544340, 544368, 544391, 544400, 544430, 544448, 544602, 544693, 544723,
  544842, 544856, 544927, 544928, 545116, 545198, 545210, 545236, 545510,
  545534, 545555, 545715, 545800, 545867, 545918, 545958, 545958, 545977,
  545981, 546025, 546027, 546081, 546116, 546174, 546197, 546205, 546221,
  546222, 546225, 546234, 546236, 546268, 546283, 546325, 546356, 546356,
  546377, 546386, 546419, 546429, 546505, 546527, 546537, 546538, 546539,
  546616, 546630, 546632, 546633, 546634, 546638, 546653, 546657, 546680,
  546702, 546702, 547182, 547233, 547233, 547242, 547415, 547464, 547478,
  547791, 548009, 548012, 548029, 548031, 548042, 548043, 548190, 548533,
  548725, 548776, 548853, 548897, 548955, 548971, 549033, 549085, 549099,
  549101, 549103, 549108, 549110, 549113, 549114, 549122, 549149, 549170,
  549182, 549460, 549559, 549636, 549686, 549943, 549944, 550758, 550762,
  550779, 550806, 550807, 550860, 550889, 550895, 550998, 551044, 551046,
  551056, 551070, 551088, 551105, 551153, 551187, 551193, 551208, 551237,
  551257, 551285, 551290, 551437, 551469, 551486, 551542, 551566, 551627,
  551680, 551686, 551733, 551771, 551773, 551804, 551816, 551820, 551875,
  551885, 552030, 552196, 552225, 552234, 552285, 552312, 552318, 552319,
  552320, 552321, 552322, 552368, 552393, 552433, 552448, 552449, 552465,
  552475, 552479, 552481, 552486, 552815, 552851, 552952, 553121, 553681,
  553683, 553734, 553746, 553747, 553751, 553788, 553799, 553818, 553822,
  553835, 553844, 553855, 553874, 553933, 553955, 553981, 554342, 554514,
  554608, 554981, 554982, 556053, 556305, 556320, 556365, 556708, 556734,
  556750, 556926, 556971, 557133, 557134, 557199, 557332, 557552, 557567,
  557619, 557907, 557919, 558118, 558136, 558158, 558174, 558250, 558668,
  558800, 558828, 558832, 558862, 558879, 558955, 558967, 558987, 559257,
  559309, 559347, 559400, 559419, 559421, 559427, 559460, 559564, 559565,
  559566, 559591, 559767, 559768, 601190, 601194,
];
let binReject_05 = [
  400022, 400167, 400231, 400344, 401532, 401543, 401840, 402087, 402464,
  402944, 403163, 403216, 403619, 403690, 403766, 403784, 403833, 403905,
  405037, 405960, 406032, 406042, 406049, 406095, 407166, 407221, 409758,
  409970, 410040, 410836, 410846, 410881, 410894, 411079, 411501, 411568,
  411573, 411600, 411770, 411771, 411810, 412055, 412185, 412421, 412451,
  413040, 414398, 414709, 414718, 414720, 414724, 415158, 415975, 415976,
  415977, 415978, 416994, 416995, 418312, 418940, 418953, 419002, 419032,
  420767, 421156, 421783, 422957, 422968, 423223, 424030, 424067, 424631,
  424840, 425300, 425307, 425628, 425808, 425828, 425836, 425838, 426428,
  426684, 426690, 426938, 427178, 429413, 430070, 430572, 431307, 432630,
  433747, 434256, 434257, 434258, 434340, 435142, 435541, 435544, 435545,
  435546, 435547, 435880, 436127, 436618, 438854, 438857, 439707, 440066,
  440229, 440393, 441103, 441840, 442644, 442657, 442755, 442756, 442790,
  443044, 443047, 443051, 443113, 443512, 443589, 444796, 445100, 445102,
  446019, 446539, 446542, 447581, 447914, 447954, 447972, 447993, 447994,
  447995, 448223, 448261, 448825, 449163, 449209, 454507, 455552, 459954,
  461608, 462192, 463405, 464018, 466188, 466189, 467010, 470132, 470134,
  470793, 472728, 473310, 473702, 473703, 473931, 474165, 474166, 474472,
  474473, 474476, 474478, 474480, 474481, 474485, 474487, 474488, 474665,
  478200, 478433, 479851, 480213, 481582, 483314, 483492, 483950, 484718,
  485340, 487900, 487917, 491288, 498503, 510277, 510404, 510774, 510805,
  511317, 511332, 511361, 511413, 511534, 511563, 512106, 512107, 514021,
  514104, 514228, 514377, 514616, 515307, 515676, 516121, 516648, 517279,
  517431, 517479, 517545, 517546, 517572, 517805, 518155, 518752, 518941,
  519100, 519452, 520266, 520602, 520711, 521105, 521333, 521853, 521870,
  521991, 523081, 523652, 523680, 524038, 524300, 524306, 524364, 524366,
  525362, 526218, 526219, 526226, 526227, 527505, 527515, 527519, 527520,
  527521, 527523, 527854, 528072, 528847, 529263, 529580, 530964, 531106,
  531257, 531258, 531259, 531260, 531445, 532211, 533051, 534774, 537993,
  538976, 539634, 540789, 541111, 541413, 542179, 542217, 542418, 542442,
  542539, 542543, 543360, 543701, 544543, 544544, 544579, 544602, 544768,
  544927, 544928, 545313, 545510, 545563, 545660, 545669, 546316, 546325,
  546356, 546533, 546540, 546616, 546617, 546626, 546630, 546632, 546633,
  546638, 546641, 546680, 546700, 546993, 547415, 547519, 548030, 548042,
  549113, 549170, 549460, 549944, 551292, 551336, 551338, 551791, 551814,
  552030, 552276, 552318, 552319, 552322, 552330, 552379, 552393, 552433,
  552465, 553732, 555426, 555440, 555753, 557729, 559551, 559591, 559758,
];
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

// Getting the BinValue
function getBIN(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, "");
  const bin = cleanedCardNumber.substring(0, 6);
  const binInteger = parseInt(bin);
  return binInteger;
}

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

async function checkCustomerEligibility(lastName, street, state, zip, bin) {
  const url = "https://radius-dev.com/xml";
  const apiKey = `${process.env.Project03_API}`;

  const xmlRequest = xmlbuilder
    .create("disposition")
    .ele("field", { id: "key", value: apiKey })
    .up()
    .ele("field", { id: "name", value: lastName })
    .up()
    .ele("field", { id: "address", value: street })
    .up()
    .ele("field", { id: "state", value: state })
    .up()
    .ele("field", { id: "zip", value: zip })
    .up()
    .ele("field", { id: "bin", value: bin.padEnd(10, "0") })
    .end({ pretty: false });

  try {
    // Making API request
    const response = await fetch(url, {
      method: "POST",
      body: xmlRequest,
      headers: {
        "Content-Type": "application/xml",
      },
    });

    // Parsing response as text
    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
}

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
const checkNumberOfAttempts = async (
  promoId,
  cardNumber,
  phoneNum,
  projNum
) => {
  try {
    // Perform a query to check for duplicates
    const existingEntry1 = await LogData.countDocuments({
      // Promo_ID: promoId,
      cardNumber: cardNumber,
      mobileNumber: phoneNum,
      Project_Number: projNum,
      ...(projNum === "Project_02" ? { Promo_ID: promoId } : {}),
    });
    console.log(existingEntry1);

    // If a duplicate entry is found, return true
    return existingEntry1 >= 5;
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
    res.sendFile(path.join(__dirname, "../FrontEnd", "binRejct.html"));
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
    // console.log(req.body);
    if (req.isAuthenticated()) {
      req.session.User = req.body.username;
      res.redirect("/new");
    } else {
      res.redirect("/login");
    }
  }
);

app.get("/binReject", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "binRejct.html"));
});

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
        res.redirect("/succesSignUp");
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
    const userId = req.session.User; // Fetch all log data from MongoDB
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

// Successful signup
app.get("/succesSignUp", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "succesfullLogged.html"));
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
      const flag = false;
      console.log(phoneNum, " ", number);
      if (req.session.promo_ID.includes("$")) {
        let constValue = getBIN(req.session.arrayData[2].cardNumber);
        if (binReject.includes(constValue)) {
          console.log("Not Eligible");
          return res.json({ message: "BIN ERROR" });
        }
        try {
          let parts = req.session.promo_ID.split("$");
          let promo_id = parts[0];
          req.session.promo_ID = promo_id;
          let proj_Num = parts[1];
          if ((promo_id = "YMA")) {
            if (
              await checkNumberOfAttempts(
                req.session.promo_ID,
                number,
                phoneNum,
                "Project_03"
              )
            ) {
              return res.json({ message: "Maximum Attempts Reached" });
            }
            let mm = req.session.arrayData[2].cardExpiry.split("/")[0];
            let yy = req.session.arrayData[2].cardExpiry.split("/")[1];
            const postValues = {
              customer_email: req.session.arrayData[0].EmailId,
              billing_first_name: req.session.arrayData[0].FirstName,
              billing_last_name: req.session.arrayData[0].LastName,
              billing_phone: req.session.arrayData[0].MobileNumber,
              billing_address1: req.session.arrayData[0].Address1,
              billing_address2: req.session.arrayData[0].Address2,
              billing_city: req.session.arrayData[0].City,
              billing_state: req.session.arrayData[0].State,
              billing_postcode: req.session.arrayData[0].Pincode,
              billing_country: req.session.arrayData[0].Country,
              cc_number: req.session.arrayData[2].cardNumber,
              cc_exp_month: mm,
              cc_exp_year: "20" + yy,
              cc_sec_code: req.session.arrayData[2].cardCcv,
              skus: [
                {
                  sku: "20AM4U3A", // SKU_CODE_HERE
                  quantity: 1,
                },
              ],
              password: `${process.env.PWD}`,
            };
            const vmaUrl =
              "https://yourmoneyadvantage.com/api/order/create/v4/revo";

            try {
              console.log(req.session.arrayData);
              let response = await axios.post(vmaUrl, postValues, {
                headers: {
                  "Content-Type": "application/json",
                  apiKey: `${process.env.YMA_API}`,
                },
              });
              console.log(response);
              if (response.data.success == true) {
                saveDataToMongoDB(
                  req.session.arrayData,
                  "Success",
                  req.user,
                  "Project_04",
                  "Project04",
                  req
                );
                return res.json({ message: "Data Recieved Successfully" });
              } else {
                // console.log;
                saveDataToMongoDB(
                  req.session.arrayData,
                  "Failure",
                  req.user,
                  "Project_04",
                  "Project04",
                  req
                );
                return res.json({
                  message: "Data not Receieved",
                  Error: response.data.message,
                });
              }
            } catch (err) {
              console.log("Error Occured : " + err.message + " ");
              return res.json({
                message: "Data not Receieved",
                Error: err.message,
              });
            }
          } else {
            try {
              let mm = req.session.arrayData[2].cardExpiry.split("/")[0];
              let yy = req.session.arrayData[2].cardExpiry.split("/")[1];
              const postValues = {
                customer_email: req.session.arrayData[0].EmailId,
                billing_first_name: req.session.arrayData[0].FirstName,
                billing_last_name: req.session.arrayData[0].LastName,
                billing_phone: req.session.arrayData[0].MobileNumber,
                billing_address1: req.session.arrayData[0].Address1,
                billing_address2: req.session.arrayData[0].Address2,
                billing_city: req.session.arrayData[0].City,
                billing_state: req.session.arrayData[0].State,
                billing_postcode: req.session.arrayData[0].Pincode,
                billing_country: req.session.arrayData[0].Country,
                cc_number: req.session.arrayData[2].cardNumber,
                cc_exp_month: mm,
                cc_exp_year: "20" + yy,
                cc_sec_code: req.session.arrayData[2].cardCcv,
                skus: [
                  {
                    sku: "20AM4A3A", // SKU_CODE_HERE
                    quantity: 1,
                  },
                ],
                password: `${process.env.PWD}`,
              };
              const wedoUrl =
                "https://wellnessexpertsondemand.com/api/order/create/v4/revo";
              if (
                await checkNumberOfAttempts(
                  req.session.promo_ID,
                  number,
                  phoneNum,
                  "Project_04"
                )
              ) {
                return res.json({ message: "Maximum Attempts Reached" });
              }
              try {
                console.log(req.session.arrayData);
                let response = await axios.post(wedoUrl, postValues, {
                  headers: {
                    "Content-Type": "application/json",
                    apiKey: `${process.env.WEOD_API}`,
                  },
                });
                // console.log(response.data);
                if (response.data.success == true) {
                  saveDataToMongoDB(
                    req.session.arrayData,
                    "Success",
                    req.user,
                    "Project_04",
                    "Project04",
                    req
                  );
                  return res.json({ message: "Data Recieved Successfully" });
                } else {
                  saveDataToMongoDB(
                    req.session.arrayData,
                    "Failure",
                    req.user,
                    "Project_04",
                    "Project04",
                    req
                  );
                  // console.log;
                  return res.json({
                    message: "Data not Receieved",
                    Error: response.data.message,
                  });
                }
              } catch (err) {
                console.log("Error Occured : " + err.message + " ");
                return res.json({
                  message: "Data not Receieved",
                  Error: err.message,
                });
              }
            } catch (error) {
              console.log("Error Occured in WEDO Code");
              return res.json({
                message: "Data not Receieved",
                Error: err.message,
              });
            }
          }
        } catch (err) {
          console.log("Error Occured in the above VMA Code");
          return res.json({
            message: "Data not Receieved",
            Error: err.message,
          });
        }
      } else if (req.session.promo_ID == "project03") {
        if (
          await checkNumberOfAttempts(
            req.session.promo_ID,
            number,
            phoneNum,
            "Project_03"
          )
        ) {
          res.json({ message: "Maximum Attempts Reached" });
          return;
        }
        try {
          const cardNumberWithDashes = req.session.arrayData[2].cardNumber;
          const cardNumberWithoutDashes = cardNumberWithDashes.replace(
            /-/g,
            ""
          );
          const first10Digits = cardNumberWithoutDashes.substring(0, 10);
          console.log(first10Digits);
          const responseData = await checkCustomerEligibility(
            req.session.arrayData[0].LastName,
            req.session.arrayData[0].Address1,
            req.session.arrayData[0].State,
            req.session.arrayData[0].Pincode,
            first10Digits
          );
          console.log(responseData);
          // Parsing XML response using promisified parseString
          const parsedData = await parseString(responseData);
          console.log(parsedData.results["$"].status);
          console.log(parsedData.results["$"].message);
          console.log(typeof parsedData.results["$"].status);
          console.log(typeof parsedData.results["$"].message);

          // Checking response status
          if (parsedData.results["$"].status === "0") {
            saveDataToMongoDB(
              req.session.arrayData,
              "Failure",
              req.user,
              "Project_03",
              "Project03",
              req
            );
            console.log(`Error: ${parsedData.results["$"].message}`);
            return res.json({
              message: "Data not Receieved",
              Error: parsedData.results["$"].message,
            });
          } else if (parsedData.results["$"].status === "1") {
            if (parsedData.results["$"].message === "true") {
              saveDataToMongoDB(
                req.session.arrayData,
                "Success",
                req.user,
                "Project_03",
                "Project03",
                req
              );
              return res.json({ message: "Data Recieved Successfully" });
            } else {
              console.log(`Blocked: ${parsedData.results["$"].message}`);
              saveDataToMongoDB(
                req.session.arrayData,
                "Failure",
                req.user,
                "Project_03",
                "Project03",
                req
              );
              return res.json({
                message: "Data not Receieved",
                Error: parsedData.results["$"].message,
              });
            }
          } else {
            console.log("Unknown response status");
            saveDataToMongoDB(
              req.session.arrayData,
              "Failure",
              req.user,
              "Project_03",
              "Project03",
              req
            );
            return res.json({
              message: "Data not Receieved",
              Error: "Unknown response status",
            });
          }
        } catch (err) {
          console.log(`Unexpected Error Occured : ${err} `);
        }
      } else {
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
              await checkNumberOfAttempts(
                req.session.promo_ID,
                number,
                phoneNum,
                "Project_02"
              )
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
              phoneNum,
              "Project_01"
            );
            console.log(attemptsData);
            if (attemptsData == false) {
              try {
                const result = await placeOrder(req.session.arrayData, req);
                // console.log(result.data);
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
    }
  } catch (err) {
    console.log("Error Occured while executing the code : " + err);
    res.json({ message: "Error Occured while Executing the code" });
  }
});
