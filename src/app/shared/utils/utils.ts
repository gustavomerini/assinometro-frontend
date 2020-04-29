import { PriceHistory } from "src/app/core/price-history/price-history";
import { Subscription } from "src/app/core/subscription/subscription";

export function handleCognitoError(error) {
  return `error${camelToSnakeCase(error.code)}`;
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function calculatePeriods(pricesHistory: PriceHistory[]) {
  const today = new Date();
  const filteredPrices = pricesHistory
    .reverse()
    .filter(
      (thing, index, self) =>
        self.findIndex(
          (t) => t.month === thing.month && t.year === thing.year
        ) === index
    );
  const actualMonthPrice = filteredPrices.filter(
    (price) => price.month === today.getMonth() + 1
  )[0];
  return {
    month: Math.ceil(actualMonthPrice.price),
    year: Math.round(actualMonthPrice.price * 12 * 100) / 100,
    week: Math.round((actualMonthPrice.price / 4) * 100) / 100,
  };
}

export function calculateActualMonthCost(subscriptions: Subscription[]) {
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
