"use client";

import { PGlite } from "@electric-sql/pglite";
const db = new PGlite("idb://medblocks-db");

export default db;
