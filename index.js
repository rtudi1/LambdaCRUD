import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { uuidv4 } from "uuid";

export const handler = async (event) => {
  console.log("request:", JSON.stringify(event, undefined, 2));
  let response;

  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.queryStringParameters != null) {
          body = await getProductByCategory(event);
        } else if (event.pathParameters != null) {
          body = await getProduct(event.pathParameters.id);
        } else {
          body = await getAllProducts();
        }
        break;
      case "POST":
        body = await createProduct(event);
        break;

      case "DELETE":
        body = await deleteProduct(event.pathParameters.id);
        break;

      case "PUT":
        body = await updateProduct(event);
        break;

      default:
        throw new Error(`Unsupported route: ${event.httpMethod}`);
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successful",
        body: body,
      }),
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error",
        body: body,
      }),
    };
  }
  return response;
};

const getProduct = async (productId) => {
  console.log("getProduct");
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: productId }),
    };

    const { Item } = await ddbClient.send(new GetItemCommand(params));

    console.log("Item", Item);

    return Item ? unmarshall(Item) : {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllProducts = async () => {
  console.log("getAllProducts");
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    const { Items } = await ddbClient.send(new ScanCommand(params));

    console.log(Items);

    return Items ? Items.map((item) => unmarshall(item)) : {};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createProduct = async (event) => {
  console.log("createProduct");
  try {
    console.log(`createProduct function. event: ${event}`);

    const productBody = JSON.parse(event.body);
    const productId = uuidv4();
    productBody.id = productId;

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(productBody || {}),
    };

    const createResult = await ddbClient.send(new PutItemCommand(params));
    console.log(createResult);

    return createResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  console.log("deleteProduct");
  try {
    console.log(`deleteProduct function. event ${event}`);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({ id: productId }),
    };

    const deleteResult = await ddbClient.send(new DeleteItemCommand(params));
    console.log(deleteResult);
    return deleteResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (event) => {
  console.log(`updateProduct`);

  try {
    const requestBody = JSON.parse(event.body);
    const objKeys = Object.keys(requestBody);
    console.log(
      `updateProduct function. requestBody " ${requestBody}, objKeys: ${objKeys}`
    );

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: event.pathParameters.id }),
      UpdateExpression: `SET ${objKeys
        .map((_, index) => `#key${index} = :value${index}`)
        .join(", ")}`,
      ExpressionAttributeNames: objKeys.reduce(
        (acc, key, index) => ({
          ...acc,
          [`#keys${index}`]: key,
        }),
        {}
      ),
      ExpressionAttributeNames: marshall(
        objKeys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`value${index}`]: requestBody[key],
          }),
          {}
        )
      ),
    };

    const updateResult = await ddbClient.send(new UpdateItemCommand(params));
    console.log(updateResult);

    return updateResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProductByCategory = async (event) => {
  console.log("getProductByCategory");
  try {
    const productId = event.pathParameters.id;
    const category = event.queryStringParameters.category;

    const params = {
      KeyCnditionExpression: "id = :productId",
      FilterExpression: "contains (category, :category)",
      ExpressionAttributeNames: {
        ":productId": { S: productId },
        ":category": { S: category },
      },
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    const { Items } = await ddbClient.send(new QueryCommand(params));
    console.log(Items);

    return Items.map((item) => unmarshall(item));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
