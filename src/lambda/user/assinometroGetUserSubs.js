"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const params = {
    TableName: "Users",
    KeyConditionExpression: "id = :a",
    ExpressionAttributeValues: {
      ":a": id
    }
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.query(params).promise();
    const today = new Date();
    //const history = data.Items[0].priceHistory ? data.Items[0].priceHistory.reverse() : [];
    responseBody =
      Object.keys(data.Items[0]).length > 0
        ? JSON.stringify({
            Items: data.Items[0].subscriptions || [],
            PriceHistory: data.Items[0].priceHistory,
            id,
            today
          })
        : JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get users: ${error}`;
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {
      "Content-Type": "applications/json",
      "access-control-allow-origin": "*"
    },
    body: responseBody
  };

  return response;
};

function appendMarkedLocation(personId, price) {
  const DB = new AWS.DynamoDB.DocumentClient();
  return DB.update({
    TableName: "Users",
    Key: { id: personId },
    ReturnValues: "ALL_NEW",
    UpdateExpression:
      "set #priceHistory = list_append(if_not_exists(#priceHistory, :empty_list), :price)",
    ExpressionAttributeNames: {
      "#priceHistory": "priceHistory"
    },
    ExpressionAttributeValues: {
      ":price": [price],
      ":empty_list": []
    }
  }).promise();
}
