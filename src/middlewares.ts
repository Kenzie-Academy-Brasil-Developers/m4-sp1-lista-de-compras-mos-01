import { NextFunction, Request, Response } from "express";
import { product } from "./database";
import {
  iListProducts,
  ListDataProductRequiredKeys,
  ListProductRequiredKeys,
} from "./interfaces";

export const validatedBodyProduct = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const payload = request.body;

  const firstListKeys: Array<string> = Object.keys(payload);
  const secondaryListKeys: Array<string> = Object.keys(payload.data[0]);
  const listKeysConcat: Array<string> = firstListKeys.concat(secondaryListKeys);

  const requiredKeys: Array<ListProductRequiredKeys> = [
    "listName",
    "data",
    "name",
    "quantity",
  ];

  let containsAllRequired: boolean = requiredKeys.every((key: string) => {
    return listKeysConcat.includes(key);
  });

  if (!containsAllRequired) {
    return response
      .status(400)
      .json({ message: `Required keys are: ${requiredKeys}` });
  }

  const { listName, data } = request.body;

  if (typeof listName !== "string" || typeof data !== "object") {
    return response
      .status(400)
      .json({ message: "The list name need to be a string " });
  }

  if (listKeysConcat.length > 4) {
    return response.status(400).json({
      message: "The Required fields are: listName,data,name and quantity",
    });
  }

  request.validatedBody = {
    listName,
    data,
  };

  next();
};

export const checkProductExistence = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { id, name } = request.params;

  const requiredKeysData: Array<ListDataProductRequiredKeys> = [
    "name",
    "quantity",
  ];

  const findNameList: iListProducts | undefined = product.find((list) => {
    return list.id === Number(id);
  });

  if (!findNameList?.id) {
    return response.status(404).json({ message: `Not found id = ${id}` });
  }

  if (request.method === "PATCH") {
    const keyFind = requiredKeysData.every((key: string) =>
      Object.keys(request.body).includes(key)
    );

    if (keyFind === false) {
      return response
        .status(400)
        .json({ message: 'Required fields are: "name" and "quantity"' });
    }

    if (!findNameList?.id) {
      return response.status(404).json({ message: `Not found id = ${id}` });
    }
  }
  request.findListIndex = Number(findNameList.id - 1);
  next();
};
