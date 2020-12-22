const crypto = require('crypto');
const express = require("express");
const validator = require("validator");
const db = require("../db");
const { post } = require('../db');
const { isDate } = require('util');


const route = express.Router()
/** 
* @typedef {object} Post
* @property {string} text
* @property {string} id
* @property {string} mediaUrl 
* @property {date} mediaDate
*/
function validatePost(body, enforce) {
    if(!body) {
      throw new Error("Invalid body");
    }
  
    const { text, mediaUrl, mediaDate, id} = body;
    if(enforce && !mediaDate || mediaDate && "string" !== typeof mediaDate) {
        throw new Error("Invalid mediaDate");
      }
  
    if(enforce && !text || text && "string" !== typeof text) {
      throw new Error("Invalid text");
    }
  
    if(enforce && !mediaUrl || mediaUrl && "string" !== typeof mediaUrl) {
      throw new Error("Invalid mediaUrl");
    }
    return {
      id: id || crypto.randomBytes(8).toString("hex"),
      text,
      mediaUrl,
      mediaDate
      
    }
  }
route.post("/", async (req, res) => {
    const { body } = req;
    try {
      const post = validatePost(body, false);
      //for in memory usage
      //users.push(user);
      const newUser = await db.post.create(post);
      res.json(newUser);
      
    } catch(e) {
      res.status(422).json({
        error: e.message,
      })
    }
  })

const ROUTE_PATH = "/post"

module.exports = {
  route,
  ROUTE_PATH
}