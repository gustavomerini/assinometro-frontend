"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { subscriptions } = JSON.parse(event.body);
  const params = {
    TableName: "Users",
    Key: {
      id,
    },
    UpdateExpression: "set subscriptions = :n",
    ExpressionAttributeValues: {
      ":n": [...subscriptions]
    },
    ReturnValues: "UPDATED_NEW"
  };
  let date = new Date;
  let month = date.getMonth() + 1;
  let year = date.getYear();
  let price = calculatePrice(subscriptions);
  let responseBody = "";
  let statusCode = 0;
  try {
    appendMarkedLocation(id, {
      year,
      price,
      month,
    }).then(console.log('updated price history'))
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

function appendMarkedLocation (personId, price) {
  const DB = new AWS.DynamoDB.DocumentClient();
  return DB.update({
    TableName: 'Users',
    Key: { id: personId },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #priceHistory = list_append(if_not_exists(#priceHistory, :empty_list), :price)',
    ExpressionAttributeNames: {
      '#priceHistory': 'priceHistory'
    },
    ExpressionAttributeValues: {
      ':price': [price],
      ':empty_list': []
    }
  }).promise()
}

function calculatePrice (subscriptions) {
    const price = subscriptions.reduce((prev, acc) => {
        let price = acc.price;
        if (acc.frequency === "WEEKLY") {
            price = price * 4;
        }
        if (acc.frequency === "ANNUALLY") {
            price = price / 12;
        }
        return price + prev;
    }, 0);
    return price;
}

