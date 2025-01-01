"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas";
import {
  getProductByUpc,
  createProduct as createProductData,
} from "@/data/product";

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { upc } = validatedFields.data;

  if (upc) {
    const existingProduct = await getProductByUpc(upc);
    if (existingProduct) return { error: "Product already existed!" };
  }
  await createProductData(validatedFields.data);
};
