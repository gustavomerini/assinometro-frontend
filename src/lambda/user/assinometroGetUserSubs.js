"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const params = {
    TableName: "Users",
    Key: {
      id,
    },
    ProjectionExpression: "subscriptions"
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.scan(params).promise();
    const filteredData = data.Items.filter(item => Object.keys(item).length > 0)[0];
    responseBody = JSON.stringify({Items: [...filteredData.subscriptions]});
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
