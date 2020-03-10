"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const params = {
    TableName: "Subscriptions",
    Key: {
      id,
    }
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to delete subscription: ${error}`;
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
