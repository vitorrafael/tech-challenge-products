// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.get("/", (req, res) => {
//   res.send("Olá, mundo! Estou rodando no Docker!");
// });
//
// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });

import express from "express";
import { swaggerUi, swaggerDocs } from "./infrastructure/config/swagger.ts";
import productsAPIRouter from "./api/ProductsAPI";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(productsAPIRouter);
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

export default app;
