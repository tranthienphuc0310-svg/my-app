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
type ProductsResponse = z.infer<typeof productsSchema>;
const fetchPosts = async (): Promise<ProductsResponse> => {
  try{
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axios.get("https://dummyjson.com/products?limit=194");
  const validatedData = productsSchema.parse(response.data);
  return validatedData;
} catch(error){
  console.error(error)
  throw error
}
};
export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: fetchPosts,
});
