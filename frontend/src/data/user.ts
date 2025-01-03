import {
  type ScanCommandInput,
  type ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { client } from "@/data/utils";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  emailVerified?: string;
};

const tableName = process.env.AUTH_DYNAMODB_TABLE_NAME;
const indexName = process.env.AUTH_INDEX_NAME || "GSI1";

export const getUsers = async () => {
  try {
    const params: ScanCommandInput = {
      TableName: tableName,
      FilterExpression:
        "begins_with(pk, :pkPrefix) AND begins_with(sk, :skPrefix)",
      ExpressionAttributeValues: {
        ":pkPrefix": "USER",
        ":skPrefix": "USER",
      },
    };

    let data: ScanCommandOutput;
    let items: User[] = [];

    do {
      data = await client.scan(params);
      items = items.concat(data.Items as User[]);
      params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (data.LastEvaluatedKey);
    return items;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
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
        ":gsi1pk": `USER#${email}`,
        ":gsi1sk": `USER#${email}`,
      },
    });

    return data.Items?.[0] as User;
  } catch {
    return null;
  }
};

export const getUser = async (userId: string) => {
  try {
    const data = await client.get({
      TableName: tableName,
      Key: {
        pk: `USER#${userId}`,
        sk: `USER#${userId}`,
      },
    });
    return data.Item as User;
  } catch {
    return null;
  }
};

type UserRole = "USER" | "ADMIN";

// eslint-disable-next-line
export const createUser = async (data: any, role: UserRole = "USER") => {
  const user: User = {
    // eslint-disable-next-line
    ...(data as any),
    role,
    id: crypto.randomUUID(),
  };

  await client.put({
    TableName: tableName,
    Item: {
      ...user,
      pk: `USER#${user.id}`,
      sk: `USER#${user.id}`,
      type: "USER",
      GSI1PK: `USER#${user.email}`,
      GSI1SK: `USER#${user.email}`,
      created_at: new Date().toISOString(),
    },
  });

  return user;
};

export const updateUser = async (userId: string, updateFields: object) => {
  const existingUser = await getUser(userId);
  await client.put({
    TableName: tableName,
    Item: {
      ...existingUser,
      ...updateFields,
      updated_at: new Date().toISOString(),
    },
  });
};
