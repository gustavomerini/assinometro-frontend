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

    let results = [];
    phoneSubscriptions = allSubs.filter((sub) => sub.type === "PHONE");
    mobileSubscriptions = allSubs.filter((sub) => sub.type === "MOBILE");
    televisionSubscriptions = allSubs.filter((sub) => sub.type === "TELEVISION");
    internetSubscriptions = allSubs.filter((sub) => sub.type === "INTERNET");
    subscriptions.forEach(sub => {
     let result = genericAnalyse(sub) 
     sub.result = result;
    })
    responseBody = JSON.stringify({subscriptions: [...subscriptions], id});
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

const genericAnalyse = (sub) => {
  switch (sub.type) {
    case 'TELEVISION':
      return analyseTelevisionSubscriptions(televisionSubscriptions, sub);
    case 'MOBILE':
      return analyseMobileSubscriptions(mobileSubscriptions, sub);
    case 'INTERNET':
      return analyseInternetSubscriptions(internetSubscriptions, sub);
    case 'PHONE':
      return analysePhoneSubscriptions(phoneSubscriptions, sub);     
    default:
      return null
  }
}
// PHONE

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
const analyseTelevisionSubscriptions = (
  mobileSubscriptions,
  userTelevisionSub
) => {
  const tetse = mobileSubscriptions.sort((a, b) => {
    a.score = scoreTelevisionObj(a);
    b.score = scoreTelevisionObj(b);
    return scoreTelevisionObj(b) - scoreTelevisionObj(a);
  });
  const subScore = scoreTelevisionObj(userTelevisionSub);
  const betterSubs = tetse.filter(
    (sub) => sub.score >= subScore && sub.price <= userTelevisionSub.price
  );
  const a = betterSubs.length;
  const b = tetse.length;
  const percentage = (a * 100) / b;
  return percentage;
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
const analyseInternetSubscriptions = (mobileSubscriptions, userInternetSub) => {
  const tetse = mobileSubscriptions.sort((a, b) => {
    a.score = scoreInternetObj(a);
    b.score = scoreInternetObj(b);
    return scoreInternetObj(b) - scoreInternetObj(a);
  });
  const subScore = scoreInternetObj(userInternetSub);
  const betterSubs = tetse.filter(
    (sub) => sub.score >= subScore && sub.price <= userInternetSub.price
  );
  const a = betterSubs.length;
  const b = tetse.length;
  const percentage = (a * 100) / b;
  //console.log(betterSubs, percentage);
  return percentage;
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
const analyseMobileSubscriptions = (mobileSubscriptions, userMobileSub) => {
  const tetse = mobileSubscriptions.sort((a, b) => {
    a.score = scoreMobileObj(a);
    b.score = scoreMobileObj(b);
    return scoreMobileObj(b) - scoreMobileObj(a);
  });
  const subScore = scoreMobileObj(userMobileSub);
  const betterSubs = tetse.filter(
    (sub) => sub.score >= subScore && sub.price <= userMobileSub.price
  );
  const a = betterSubs.length;
  const b = tetse.length;
  const percentage = (a * 100) / b;
  return percentage;
};