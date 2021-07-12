import { KeyValue, KeyValuePipe } from '@angular/common';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "keyasint",
})
export class KeyAsIntPipe implements PipeTransform {
  transform(
    input: Array<KeyValue<string, string>>,
    args?: any
  ): Array<KeyValue<number, string>> {
    return input?.map((pair) => ({
      key: parseInt(pair.key),
      value: pair.value,
    }));
  }
}
