"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  let id = "12345";
  const params = {
    TableName: "Users",
    Item: {
      id
    }
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (error) {
    responseBody = `Unable to put user: ${error}`;
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
