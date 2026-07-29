"use client";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
const productsSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      rating: z.number().optional(),
      price: z.number().optional(),
      category: z.string().optional(),
      thumbnail: z.string().optional(),
    }),
  ),
});
const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  rating: z.number().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
});
type Productresponse = z.infer<typeof productSchema>;
type ProductsResponse = z.infer<typeof productsSchema>;
const fetchPosts = async (): Promise<ProductsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get("https://dummyjson.com/products?limit=0");
  const validatedData = productsSchema.parse(response.data);
  return validatedData;
};
const fetchdetailproduct = async (id: string): Promise<Productresponse> => {
  console.log("id =", id);
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return productSchema.parse(res.data);
};
export const Productdetails = (id: string) =>
  queryOptions({
    queryKey: ["detailproduct", id],
    queryFn: () => fetchdetailproduct(id),
  });
export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: fetchPosts,
});
