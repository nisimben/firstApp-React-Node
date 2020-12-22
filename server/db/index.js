const user = require("./user");
const post = require("./post");
const connect = require("./connection");


const connection = connect.getConnection();
module.exports = {
  // user: user(connection),
  post: post(connection),
}