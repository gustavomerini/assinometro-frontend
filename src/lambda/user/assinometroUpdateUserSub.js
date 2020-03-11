"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  // const { id, subscriptionName } = JSON.parse(event.body);
  const params = {
    TableName: "Users",
    Key: {
      id: "12345",
    },
    UpdateExpression: "set subscriptions = :n",
    ExpressionAttributeValues: {
      ":n": {
        id: "12345",
        subscriptionName: "Netflix"
      }
    },
    ReturnValues: "UPDATED_NEW"
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to update subscription: ${error}`;
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
