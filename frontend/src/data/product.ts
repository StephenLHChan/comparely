"use server";

import {
  type ScanCommandInput,
  type ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { client } from "@/data/utils";
import { currentUser } from "@/lib/auth";

export type Product = {
  id: number;
  name: string;
  upc?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
};

const tableName =
  process.env.PRODUCT_DYNAMODB_TABLE_NAME || "comparely-product";
const indexName = process.env.PRODUCT_INDEX_NAME || "GSI1";

export const getProducts = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const params: ScanCommandInput = {
      TableName: tableName,
      FilterExpression:
        "begins_with(pk, :pkPrefix) AND begins_with(sk, :skPrefix)",
      ExpressionAttributeValues: {
        ":pkPrefix": "PRODUCT",
        ":skPrefix": "PRODUCT",
      },
    };

    let data: ScanCommandOutput;
    let items: Product[] = [];

    do {
      data = await client.scan(params);
      items = items.concat(data.Items as Product[]);
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (data.LastEvaluatedKey);
    return items;
  } catch {
    return null;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const data = await client.get({
      TableName: tableName,
      Key: {
        pk: `PRODUCT#${productId}`,
        sk: `PRODUCT#${productId}`,
      },
    });
    return data.Item as Product;
  } catch {
    return null;
  }
};

export const getProductByUpc = async (upc: string) => {
  try {
    const data = await client.query({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk",
      ExpressionAttributeNames: {
        "#gsi1pk": "GSI1PK",
        "#gsi1sk": "GSI1SK",
      },
      ExpressionAttributeValues: {
        ":gsi1pk": `PRODUCT#${upc}`,
        ":gsi1sk": `PRODUCT#${upc}`,
      },
    });

    return data.Items?.[0] as Product;
  } catch {
    return null;
  }
};

// eslint-disable-next-line
export const createProduct = async (data: any) => {
  const product: Product = {
    // eslint-disable-next-line
    ...(data as any),
    id: crypto.randomUUID(),
  };

  await client.put({
    TableName: tableName,
    Item: {
      ...product,
      pk: `PRODUCT#${product.id}`,
      sk: `PRODUCT#${product.id}`,
      type: "PRODUCT",
      GSI1PK: `PRODUCT#${product.upc}`,
      GSI1SK: `PRODUCT#${product.upc}`,
      created_at: new Date().toISOString(),
    },
  });

  await client.put({
    TableName: tableName,
    Item: {
      ...product,
      pk: `BRAND#${product.id}`,
      sk: `PRODUCT#${product.id}`,
      type: "PRODUCT",
      GSI1PK: `PRODUCT#${product.upc}`,
      GSI1SK: `PRODUCT#${product.upc}`,
      created_at: new Date().toISOString(),
    },
  });

  return product;
};

export const updateUser = async (productId: string, updateFields: object) => {
  const existingProduct = await getProduct(productId);
  await client.put({
    TableName: tableName,
    Item: {
      ...existingProduct,
      ...updateFields,
      updated_at: new Date().toISOString(),
    },
  });
};
