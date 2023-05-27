import express from "express";
import { db } from "../db.js";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const waitRequestRouter = express.Router();
const menuRef = collection(db, "menuItems");