"use strict";

const AWS = require("aws-sdk");
let phoneSubscriptions = [];
let mobileSubscriptions = [];
let televisionSubscriptions = [];
let internetSubscriptions = [];

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const { id, subscriptions } = JSON.parse(event.body);
  const params = {
    TableName: "Users",
    ProjectionExpression: "subscriptions, id",
  };
  let responseBody = "";
  let statusCode = 0;
  try {
    const data = await documentClient.scan(params).promise();
    let validSubs = data.Items.filter(
      (obj) =>
        obj.id !== id &&
        obj &&
        obj.subscriptions &&
        obj.subscriptions.length > 0
    );
    let allSubs = validSubs.reduce((prev, curr) => {
      return [...prev, ...curr.subscriptions];
    }, []);

    let results = [];
    phoneSubscriptions = allSubs.filter((sub) => sub.type === "PHONE");
    mobileSubscriptions = allSubs.filter((sub) => sub.type === "MOBILE");
    televisionSubscriptions = allSubs.filter(
      (sub) => sub.type === "TELEVISION"
    );
    internetSubscriptions = allSubs.filter((sub) => sub.type === "INTERNET");
    subscriptions.forEach((sub) => {
      let result = genericAnalyse(sub);
      sub.result = result;
    });
    responseBody = JSON.stringify({ subscriptions: [...subscriptions], id });
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get users: ${error}`;
    statusCode = 403;
  }

  const response = {
    statusCode,
    headers: {
      "Content-Type": "applications/json",
      "access-control-allow-origin": "*",
    },
    body: responseBody,
  };

  return response;
};

// PHONE

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

// TELEVISION

const scoreTelevisionObj = (o) => {
  let score = 0;
  if (o.ext.devicesCount) {
    score += o.ext.devicesCount * 10;
  }
  if (o.ext.channelsCount) {
    score += o.ext.channelsCount;
  }

  return score;
};

// INTERNET
const scoreInternetObj = (o) => {
  let score = 0;
  if (o.ext.devicesCount) {
    score += o.ext.uploadSpeed;
  }
  if (o.ext.downloadSpeed) {
    score += o.ext.downloadSpeed;
  }
  if (o.ext.isFibra) {
    score += 10;
  }
  return score;
};

// MOBILE

const scoreMobileObj = (o) => {
  let score = 0;
  if (o.ext.hasUnlimitedInternetApp) {
    score += 10;
  }
  if (o.ext.unlimitedCallsBrasil) {
    score += 10;
  }
  score += o.ext.gbQuantity;

  return score;
};

const analyseSubscriptions = (mobileSubscriptions, userSub, scoreFunction) => {
  scoreFunction(userSub);
  const similarSubs = mobileSubscriptions
    .sort((a, b) => {
      a.score = scoreFunction(a);
      b.score = scoreFunction(b);
      return scoreFunction(b) - scoreFunction(a);
    })
    .filter((sub) => isSimilar(sub.score, userSub.score, 25));
  const betterSubs = similarSubs.filter((sub) =>
    isSimilar(sub.price, userSub.price, 20)
  );
  const a = similarSubs.length;
  const b = betterSubs.length;
  const percentage = (a * 100) / b;
  return percentage;
};

const isSimilar = (subScore, userSubScore, percent) => {
  const result = subScore - userSubScore;
  const percentage = (100 * result) / userSubScore;
  return (
    (percentage <= percent && percentage >= 0) ||
    (percentage >= -percent && percentage <= 0)
  );
};

const genericAnalyse = (sub) => {
  switch (sub.type) {
    case "TELEVISION":
      return analyseSubscriptions(
        televisionSubscriptions,
        sub,
        scoreTelevisionObj
      );
    case "MOBILE":
      return analyseSubscriptions(mobileSubscriptions, sub, scoreMobileObj);
    case "INTERNET":
      return analyseSubscriptions(internetSubscriptions, sub, scoreInternetObj);
    case "PHONE":
      return analyseSubscriptions(phoneSubscriptions, sub, scorePhoneObj);
    default:
      return null;
  }
};
