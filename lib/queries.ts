export const PRODUCT_CARD_FRAGMENT = /* GraphQL */ `
  fragment ProductCard on Product {
    id
    handle
    title
    featuredImage { url altText width height }
    priceRange { minVariantPrice { amount currencyCode } }
  }
`;

export const GET_ALL_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_CARD_FRAGMENT}
  query GetAllProducts($first: Int = 50) {
    products(first: $first) {
      nodes { ...ProductCard }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 10) { nodes { url altText width height } }
      variants(first: 10) {
        nodes {
          id
          title
          price { amount currencyCode }
        }
      }
      ... on Product { metafields(namespace: "custom", first: 10) { nodes { key value } } }
    }
  }
`;
