"use client";

import * as z from "zod";

import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "../form-error";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { createProduct } from "@/actions/createProduct";

export const CreateProductForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProduct(values).then(res => {
        setError(res?.error);
        // setSuccess(res.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Natrel Fine-filtered 0% Fat Free Skim Milk, 2 L"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="upc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPC</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0012345600"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};
