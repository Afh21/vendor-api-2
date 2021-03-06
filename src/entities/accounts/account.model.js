const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

//TODO validate unique function

const uniqueValidator = (Model, field, value) => {
  return new Promise(async (resolve, reject) => {
    const response = await Model.find({ [field]: value }).exec();
    resolve(response.length <= 0);
  });
};

var accountSchema = Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: value => uniqueValidator(Account, "email", value),
      message: "email is in use"
    }
  },
  identificationPhone: { type: String },
  password: { type: String, required: true },
  pinPass: { type: String },
  twoFactorsToken: { type: String },
  facebookToken: { type: String },
  googleToken: { type: String },
  twitterToken: { type: String },
  isAdmin: { type: Boolean, default: false },
  isCustomer: { type: Boolean, default: false },
  isVendor: { type: Boolean, default: false },
  owner: {
    type: OID,
    ref: "User",
    required: true
  },
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() }
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
