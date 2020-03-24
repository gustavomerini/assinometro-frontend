"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Subscriptions"
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get subscriptions: ${error}`;
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {
      "Content-Type": "applications/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: responseBody
  };

  return response;
};
