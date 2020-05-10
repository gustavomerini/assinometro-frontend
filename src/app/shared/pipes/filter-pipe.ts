import { PipeTransform, Pipe } from "@angular/core";
import { Subscription } from "src/app/core/subscription/subscription";
import * as config from "src/config.json";

@Pipe({
  name: "filter",
  pure: false,
})
export class FilterPipe implements PipeTransform {
  
  transform(items: Subscription[]): any {
    if (!items) {
      return items;
    }
    return items.filter((item) => config.validTypes.includes(item.type));
  }
}
