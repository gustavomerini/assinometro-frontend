"use strict";

const AWS = require("aws-sdk");
let phoneSubscriptions = [];
let mobileSubscriptions = [];
let televisionSubscriptions = [];
let internetSubscriptions = [];

const saveUserExtInfo = async (id, subs) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const getParams = {
    TableName: "Users",
    KeyConditionExpression: "id = :a",
    ExpressionAttributeValues: {
      ":a": id
    }
  };
  const getData = await documentClient.query(getParams).promise();
  const subscriptions = getData.Items[0].subscriptions.map(sub => {
    const updatedSub = subs.filter(
      otherSub => sub.uniqueId === otherSub.uniqueId
    )[0];
    if (updatedSub && Object.keys(updatedSub).length > 0) {
      sub.ext = updatedSub.ext;
    }
    return sub;
  });
  const updateParams = {
    TableName: "Users",
    Key: {
      id
    },
    UpdateExpression: "set subscriptions = :n",
    ExpressionAttributeValues: {
      ":n": [...subscriptions]
    },
    ReturnValues: "UPDATED_NEW"
  };
  const response = await documentClient.update(updateParams).promise();
  return "done";
};

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
    let validSubs = data.Items.filter(
      obj =>
        obj.id !== id &&
        obj &&
        obj.subscriptions &&
        obj.subscriptions.length > 0
    );
    let allSubs = validSubs.reduce((prev, curr) => {
      return [...prev, ...curr.subscriptions];
    }, []);

    let results = [];
    phoneSubscriptions = allSubs.filter(sub => sub.type === "PHONE");
    mobileSubscriptions = allSubs.filter(sub => sub.type === "MOBILE");
    televisionSubscriptions = allSubs.filter(sub => sub.type === "TELEVISION");
    internetSubscriptions = allSubs.filter(sub => sub.type === "INTERNET");
    subscriptions.forEach(sub => {
      const { percentage, betterSubs = [] } = genericAnalyse(sub);
      sub.result = percentage;
      if (betterSubs.length) {
        sub.betterSubs =
          betterSubs.length >= 4
            ? betterSubs.slice(0, 4)
            : betterSubs.slice(0, betterSubs.length);
      }
    });
    const userInfo = await saveUserExtInfo(id, subscriptions);
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
      "access-control-allow-origin": "*"
    },
    body: responseBody
  };

  return response;
};

// PHONE

const scorePhoneObj = o => {
  let score = 0;
  if (!o.ext) {
    return score;
  }
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
  o.score = score;
  return score;
};

// TELEVISION

const scoreTelevisionObj = o => {
  let score = 0;
  if (!o.ext) {
    return score;
  }
  if (o.ext.deviceCount) {
    score += +o.ext.deviceCount * 4;
  }
  if (o.ext.channelCount) {
    score += +o.ext.channelCount;
  }
  o.score = score;
  return score;
};

// INTERNET
const scoreInternetObj = o => {
  let score = 0;
  if (!o.ext) {
    return score;
  }
  if (o.ext.devicesCount) {
    score += +o.ext.uploadSpeed;
  }
  if (o.ext.downloadSpeed) {
    score += +o.ext.downloadSpeed;
  }
  if (o.ext.isFibra) {
    score += 10;
  }
  o.score = score;
  return score;
};

// MOBILE

const scoreMobileObj = o => {
  let score = 0;
  if (!o.ext) {
    return score;
  }
  if (o.ext.hasUnlimitedInternetApp) {
    score += 10;
  }
  if (o.ext.unlimitedCallsBrasil) {
    score += 10;
  }
  score += +o.ext.gbQuantity;
  o.score = score;
  return score;
};

const analyseSubscriptions = (subs, userSub, scoreFunction) => {
  scoreFunction(userSub);
  const sortedSubs =
    subs.sort((a, b) => {
      return scoreFunction(b) - scoreFunction(a);
    }) || [];

  //const similarSubs = sortedSubs.filter((sub) => isSimilar(sub.score, userSub.score, 20)) ;
  //const betterSubs = sortedSubs.filter(
  //  (sub) => +sub.score >= +userSub.score && +sub.price <= +userSub.price
  //);
  const betterSubs = sortedSubs.filter(sub => sub.score >= userSub.score);
  const result = [...betterSubs];
  const tetse = result.filter(sub => {
    let userPrice = sub.price;
    let otherPrice = userSub.price;
    if (sub.frequency === "WEEKLY") {
      userPrice = sub.price * 4;
      otherPrice = userSub.price * 4;
    } else if (sub.frequency === "ANNUALLY") {
      userPrice = userSub.price / 12;
      otherPrice = sub.price / 12;
    }
    return isSimilar(userPrice, otherPrice, 30);
  });
  const a = tetse.length;
  const b = result.length;
  const percentage = (a * 100) / b;
  return { percentage, betterSubs: tetse };
};

const isSimilar = (subScore, userSubScore, percent) => {
  const result = +subScore - +userSubScore;
  const percentage = (100 * result) / +userSubScore;
  return (
    (percentage <= percent && percentage >= 0) ||
    (percentage >= -percent && percentage <= 0)
  );
};

const genericAnalyse = sub => {
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
