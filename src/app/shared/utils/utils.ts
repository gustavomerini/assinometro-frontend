import { PriceHistory } from "src/app/core/price-history/price-history";
import { Subscription } from "src/app/core/subscription/subscription";

export function handleCognitoError(error) {
  return `error${camelToSnakeCase(error.code)}`;
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function calculatePeriods(pricesHistory: PriceHistory[], today: any) {
  if (!pricesHistory || !pricesHistory.length) return null;
  const date = new Date();
  const actualMonthPrice = pricesHistory.filter(
    (price) => price.month === date.getMonth() + 1
  )[0];
  return {
    month: Math.ceil(actualMonthPrice.price),
    year: Math.round(actualMonthPrice.price * 12 * 100) / 100,
    week: Math.round((actualMonthPrice.price / 4) * 100) / 100,
  };
}

export function calculateActualMonthCost(subscriptions: Subscription[]) {
  if (!subscriptions || !subscriptions.length) return null;
  const price = subscriptions.reduce((prev, acc) => {
    let price = +acc.price;
    if (acc.frequency === "WEEKLY") {
      price = price * 4;
    }
    if (acc.frequency === "ANNUALLY") {
      price = price / 12;
    }
    return price + prev;
  }, 0);
  return Math.ceil(price);
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}