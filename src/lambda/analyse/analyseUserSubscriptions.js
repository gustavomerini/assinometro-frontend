"use strict";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id, subscriptions } = JSON.parse(event.body);
  const params = {
    TableName: "Users",
    ProjectionExpression: "subscriptions, id"
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.scan(params).promise();
    let validSubs = data.Items.filter(obj => obj.id !== id && obj && obj.subscriptions && obj.subscriptions.length > 0);
    let allSubs = validSubs.reduce((prev, curr) => {
        return [...prev, ...curr.subscriptions];
    }, []);
    const phoneSubscriptions = allSubs.filter((sub) => sub.type === "PHONE");
    let results = [];
    subscriptions.forEach(sub => {
     let result = analysePhoneSubscriptions(phoneSubscriptions, sub);
     sub.result = result;
    })
    responseBody = JSON.stringify(subscriptions)
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

const analysePhoneSubscriptions = (phoneSubscriptions, userSub) => {
  const tetse = phoneSubscriptions.sort((a, b) => {
    a.score = scorePhoneObj(a);
    b.score = scorePhoneObj(b);
    return scorePhoneObj(b) - scorePhoneObj(a);
  });
  const subScore = scorePhoneObj(userSub);
  userSub.score = subScore;
  const betterSubs = tetse.filter(
    (sub) => sub.score >= subScore && sub.price <= userSub.price
  );
  const a = betterSubs.length;
  const b = tetse.length;
  const percentage = (a * 100) / b;
  // console.log(betterSubs);
  return percentage;
};

const scorePhoneObj = (o) => {
  let score = 0;
  if (o.ext.allOperators) {
    score += 5;
  }
  if (o.ext.allLocales) {
    score += 5;
  }
  if (o.ext.unlimitedMobileCalls) {
    score += 5;
  }
  if (o.ext.unlimitedPhoneCalls) {
    score += 5;
  }

  return score;
};