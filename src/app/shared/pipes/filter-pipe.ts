import { PipeTransform, Pipe } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";

@Pipe({
  name: "filter",
  pure: false,
})
export class FilterPipe implements PipeTransform {
  validArgs = ["INTERNET", "PHONE", "TELEVISION", "MOBILE"];
  transform(items: Subscription[]): any {
    if (!items) {
      return items;
    }
    return items.filter((item) => this.validArgs.includes(item.type));
  }
}
