import * as humps from "humps";

export function keysSnakeCaseToCamelCase(anObject: unknown) {
  return humps.camelizeKeys(anObject);
}
