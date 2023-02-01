import express, { Application, Request, Response } from "express";
import {
  allLists,
  createListProducts,
  deleteList,
  deleteOneItemList,
  oneListProduct,
  updateProduct,
} from "./logic";
import { checkProductExistence, validatedBodyProduct } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", validatedBodyProduct, createListProducts);

app.get("/purchaseList", allLists);
app.get("/purchaseList/:id", checkProductExistence, oneListProduct);
app.patch("/purchaseList/:id/:name", checkProductExistence, updateProduct);
app.delete("/purchaseList/:id", checkProductExistence, deleteList);
app.delete("/purchaseList/:id/:name", checkProductExistence, deleteOneItemList);

app.listen(3000, () => {
  console.log("Server is running!");
});
