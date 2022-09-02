const { iteratee } = require("lodash");
const { Users } = require("../../../models/users-model");
const jwt = require("jsonwebtoken");
const config = require("config");
const { default: mongoose } = require("mongoose");

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new Users(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("aPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
