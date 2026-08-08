"use client";
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  rating: z.number().optional(),
  price: z.number(),
  category: z.string().optional(),
  thumbnail: z.string(),
});
type Productresponse = z.infer<typeof productSchema>;

const fetchdetailproduct = async (id: string): Promise<Productresponse> => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return productSchema.parse(res.data);
};
export const Productdetails = (id: string) =>
  queryOptions({
    queryKey: ["detailproduct", id],
    queryFn: () => fetchdetailproduct(id),
  });
