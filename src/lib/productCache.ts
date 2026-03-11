const productCache: Record<string, any> = {};

// get product from cache
export const getCachedProduct = (id: string) => {
  return productCache[id];
};

// save product to cache
export const setCachedProduct = (id: string, data: any) => {
  productCache[id] = data;
};
