"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Users"
  };

  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.scan(params).promise();
    console.log("started");
    const batchUpdate = await updateUsersHistory(data);
    console.log("finished");
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to update priceHistory: ${error}`;
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

async function updateUsersHistory(data) {
  console.log("function call");
  const today = new Date();
  let month = today.getMonth() + 1;
  const documentClient = new AWS.DynamoDB.DocumentClient();
  for (let item of data.Items) {
    console.log("item id", item.id);
    if (!item.priceHistory || item.priceHistory.length === 0) {
      continue;
    }
    const history = [...item.priceHistory];
    const lastRecord = history[history.length - 1];
    if (month === 12) {
      month = 1;
    }
    console.log(month, lastRecord.month);
    if (month === lastRecord.month) {
      continue;
    }
    history.push({
      month: lastRecord.month + 1,
      year: lastRecord.year,
      price: lastRecord.price
    });
    history.sort((a, b) => {
      if (a.year > b.year) {
        return 2;
      }
      if (a.year < b.year) {
        return -2;
      }
      if (a.year === b.year && a.month > b.month) {
        return 1;
      }
      if (a.year === b.year && a.month < b.month) {
        return -1;
      }
      return 0;
    });
    const params = {
      TableName: "Users",
      Key: {
        id: item.id
      },
      UpdateExpression: "set priceHistory = :n",
      ExpressionAttributeValues: {
        ":n": [...history]
      },
      ReturnValues: "UPDATED_NEW"
    };
    const data = await documentClient.update(params).promise();
  }
  return "done";
}
