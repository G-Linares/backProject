import { allProducts } from "../Data/allProducts.js";

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};
export const getAll = (req, res) => {
  res.status(200).json(allProducts);
};
export const getOne = (req, res) => {
  res.status(200).json(allProducts);
};
