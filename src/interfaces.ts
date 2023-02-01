interface iListProducts extends iListProductsRequest {
  id: number;
}

interface iProduct {
  name: string;
  quantity: string;
}

interface iListProductsRequest {
  listName: string;
  data: Array<iProduct>;
}

type ListProductRequiredKeys = "listName" | "data" | "name" | "quantity";
type ListDataProductRequiredKeys = "name" | "quantity";

export {
  iListProducts,
  iListProductsRequest,
  ListProductRequiredKeys,
  ListDataProductRequiredKeys,
};
