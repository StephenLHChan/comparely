import Link from "next/link";
import { getProducts } from "@/data/product";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import { CirclePlus } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  role: string;
  image: string;
  created_at: string;
  updated_at?: string;
};

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Button asChild>
          <Link href="/create">
            <CirclePlus className="me-2" /> Add New Product
          </Link>
        </Button>
      </div>
      {!products || products.length === 0 ? (
        <h1>Oops! Something went wrong...</h1>
      ) : (
        <DataTable data={products} dataType="Product" />
      )}
    </>
  );
};

export default ProductPage;
