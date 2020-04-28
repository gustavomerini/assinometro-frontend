import { GenericExtension } from "./extensions/generic-extension";

export interface Subscription {
  id: string;
  subscriptionName: string;
  logo: string;
  price: number;
  type: string;
  frequency: string;
  ext: GenericExtension;
}
