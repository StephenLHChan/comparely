import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(6, { message: "Minimum 6 characters required." }),
  name: z.string().min(1, { message: "Name is required." }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is requied" }),
  brandName: z.string().min(1, { message: "Brand name is requied" }),
  image: z.string().optional(),
  upc: z.string().optional(),
});
