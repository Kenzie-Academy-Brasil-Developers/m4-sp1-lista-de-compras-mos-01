import { query, request, Request, Response } from "express";
import { ids, product } from "./database";
import {
  iListProducts,
  iListProductsRequest,
  ListProductRequiredKeys,
} from "./interfaces";

export const createListProducts = (
  { validatedBody }: Request,
  response: Response
): Response => {
  const id: number = ids.length + 1;

  const existId = ids.find((el) => el === id);

  if (existId) {
    return response.status(409).json({
      message: "id exists, try again",
    });
  }

  const newListProducts: iListProducts = {
    id: id,
    ...validatedBody,
  };

  ids.push(id);
  product.push(newListProducts);

  return response.status(201).json(newListProducts);
};

export const allLists = (request: Request, response: Response): Response => {
  return response.status(200).json(product);
};

export const oneListProduct = (
  { findListIndex }: Request,
  response: Response
): Response => {
  return response.status(200).json(product[findListIndex]);
};

export const updateProduct = (
  request: Request,
  response: Response
): Response => {
  const { name } = request.params;

  const productCurrent = product[request.findListIndex].data;

  const selectItem = productCurrent.findIndex((el) => el.name === name);

  if (selectItem !== -1) {
    productCurrent[selectItem] = request.body;
  } else {
    return response
      .status(404)
      .json({ message: `The element ${name} not found` });
  }

  return response.status(200).json(product[request.findListIndex]);
};

export const deleteList = (
  { findListIndex }: Request,
  response: Response
): Response => {
  product.splice(findListIndex, 1);
  return response.status(204).json();
};

export const deleteOneItemList = (
  request: Request,
  response: Response
): Response => {
  const { name } = request.params;

  const productCurrent = product[request.findListIndex].data;

  const selectItem = productCurrent.findIndex((el) => el.name === name);

  if (selectItem !== -1) {
    productCurrent.splice(selectItem, 1);
  } else {
    return response
      .status(404)
      .json({ message: `The element ${name} not found` });
  }

  return response.status(204).json();
};
