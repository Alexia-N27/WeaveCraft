import "dotenv/config";
import { createRequire } from "module";
import express from "express";
import session from "express-session";
// cors

import pool from "./config/db.js";
import router from "./router/index.routes.js";

const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

const app = express();

// cors



const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 3600000,
  },
  pool
);

const newSession = session({
  name: "session_id",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, // a changer en true en prod si https
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600000,
    domain: "localhost",
  },
  rolling: true,
});

// cors

app.use(newSession);

app.use(express.json());

app.use(express.static("public"));

// middleware pour afficher les informations de session quand une requête est reçu

app.use(router);

app.listen(process.env.LOCAL_PORT, () => {
  console.log("Server is running at http://localhost:" + process.env.LOCAL_PORT);
})
