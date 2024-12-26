import {
  DynamoDBDocument,
  type ScanCommandInput,
  type ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDB, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const tableName = process.env.AUTH_DYNAMODB_TABLE_NAME;
const indexName = process.env.AUTH_INDEX_NAME || "GSI1";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID as string,
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET as string,
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

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
    let items = [];

    do {
      data = await client.scan(params);
      items = items.concat(data.Items);
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

    return data.Items?.[0];
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
    return data.Item;
  } catch {
    return null;
  }
};

type UserRole = "USER" | "ADMIN";

export const createUser = async (data: any, role: UserRole = "USER") => {
  const user = {
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
