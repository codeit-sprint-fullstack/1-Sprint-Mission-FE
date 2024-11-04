interface values {
  [key: string]: string | string[];
}

export function productModel(values: values = {}, tags: string[] = []) {
  values.tags = tags;
  return values;
}
