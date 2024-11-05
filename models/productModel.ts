interface ProductValues {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
}

export function productModel(values: ProductValues = {}, tags: string[] = []) {
  values.tags = tags;
  return values;
}
