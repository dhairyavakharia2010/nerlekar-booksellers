export const SHOPIFY_STORE_DOMAIN = 'ashok-anant-nerlekar.myshopify.com';
export const SHOPIFY_STOREFRONT_API_VERSION = '2024-10';
export const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (SHOPIFY_STOREFRONT_TOKEN) {
    headers['X-Shopify-Storefront-Access-Token'] = SHOPIFY_STOREFRONT_TOKEN;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API returned ${response.status}: ${response.statusText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify GraphQL errors: ${json.errors.map(e => e.message).join('; ')}`);
  }

  if (!json.data) {
    throw new Error('Shopify API returned no data');
  }

  return json.data;
}

// --- Raw Shopify types ---

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
}

export interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  onlineStoreUrl: string | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  collections: { edges: Array<{ node: { id: string; handle: string; title: string } }> };
}

interface ProductsResponse {
  products: {
    edges: Array<{ node: ShopifyProductNode }>;
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

interface ProductByHandleResponse {
  product: ShopifyProductNode | null;
}

// --- Queries ---

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  vendor
  tags
  onlineStoreUrl
  images(first: 5) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
        availableForSale
      }
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
`;

export async function fetchAllProducts(): Promise<ShopifyProductNode[]> {
  const query = `
    query GetAllProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          node { ${PRODUCT_FIELDS} }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;

  const allProducts: ShopifyProductNode[] = [];
  let cursor: string | null = null;
  let hasNext = true;

  while (hasNext) {
    const data: ProductsResponse = await shopifyFetch<ProductsResponse>(query, { first: 250, after: cursor });
    const products = data.products;
    for (const edge of products.edges) {
      allProducts.push(edge.node);
    }
    hasNext = products.pageInfo.hasNextPage;
    cursor = products.pageInfo.endCursor;
  }

  return allProducts;
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }
  `;

  const data = await shopifyFetch<ProductByHandleResponse>(query, { handle });
  return data.product;
}

// --- Cart / Checkout ---

export interface ShopifyCartLine {
  merchandiseId: string;
  quantity: number;
}

export interface ShopifyCartResult {
  cartId: string;
  checkoutUrl: string;
}

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: Array<{ message: string; code?: string; field?: string[] }>;
  };
}

export async function createShopifyCart(lines: ShopifyCartLine[]): Promise<ShopifyCartResult> {
  if (lines.length === 0) {
    throw new Error('Cannot create a cart with no line items');
  }

  for (const line of lines) {
    if (!line.merchandiseId) {
      throw new Error('One or more cart items is missing a Shopify variant ID');
    }
  }

  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
          code
          field
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lines.map(l => ({
        merchandiseId: l.merchandiseId,
        quantity: l.quantity,
      })),
    },
  };

  const data = await shopifyFetch<CartCreateResponse>(query, variables);
  const result = data.cartCreate;

  if (result.userErrors && result.userErrors.length > 0) {
    throw new Error(result.userErrors.map(e => e.message).join('; '));
  }

  if (!result.cart || !result.cart.checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL');
  }

  return {
    cartId: result.cart.id,
    checkoutUrl: result.cart.checkoutUrl,
  };
}

export async function fetchProductsByCollection(collectionHandle: string): Promise<ShopifyProductNode[]> {
  const query = `
    query GetProductsByCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node { ${PRODUCT_FIELDS} }
          }
        }
      }
    }
  `;

  type CollectionResponse = { collection: { products: { edges: Array<{ node: ShopifyProductNode }> } } } | null;

  const data = await shopifyFetch<CollectionResponse>(
    query,
    { handle: collectionHandle, first: 250 }
  );

  if (!data?.collection) return [];
  return data.collection.products.edges.map(e => e.node);
}
