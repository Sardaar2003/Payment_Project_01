const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
const billingSchema = new Schema({
  FirstName: String,
  LastName: String,
  Gender: String,
  DOB: String,
  Address1: String,
  Address2: String,
  City: String,
  State: String,
  Country: String,
  Pincode: String,
  MobileNumber: String,
  EmailId: String,
});
const shippingSchema = new Schema({
  ShipFirstName: String,
  ShipLastName: String,
  ShipGender: String,
  ShipDOB: String,
  ShipAddress1: String,
  ShipAddress2: String,
  ShipCity: String,
  ShipState: String,
  ShipCountry: String,
  ShipPincode: String,
  ShipMobileNumber: String,
  ShipEmailId: String,
});
const CardSchema = new Schema({
  cardNumber: String,
  cardExpiry: String,
  cardCcv: String,
  cardBrand: String,
});
const ResponseSchema = new Schema({
  ResponseType: String,
});
const userSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "UserData",
  },
  card: {
    type: Schema.Types.ObjectId,
    ref: "CardData",
  },
  billing: {
    type: Schema.Types.ObjectId,
    ref: "BillingData",
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: "ShippingData",
  },
  response: {
    type: Schema.Types.ObjectId,
    ref: "Response",
  },
});

userSchema.plugin(passportLocalMongoose);
const BillingData = mongoose.model("BillingData", billingSchema);
const ShippingData = mongoose.model("ShippingData", shippingSchema);
const UserData = mongoose.model("UserData", userSchema);
const CardData = mongoose.model("CardData", CardSchema);
const Response = mongoose.model("Response", ResponseSchema);

module.exports = { BillingData, ShippingData, UserData, CardData, Response };
