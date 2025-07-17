import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`;

export const shopify = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN!,
    'Content-Type': 'application/json',
  },
});

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}) {
  return shopify.request<T>(query, variables);
}
