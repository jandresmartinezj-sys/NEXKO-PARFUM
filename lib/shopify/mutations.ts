import { shopifyFetch } from "./client";
import type { Cart, CartLine } from "./types";

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                featuredImage { url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;

type RawCart = Omit<Cart, "lines"> & {
  lines: { edges: { node: CartLine }[] };
};

function reshapeCart(cart: RawCart | null): Cart | null {
  if (!cart) return null;
  return { ...cart, lines: cart.lines.edges.map((e) => e.node) };
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = [],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: { message: string }[] };
  }>({
    query: /* GraphQL */ `
      mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { lines },
    noStore: true,
  });
  const cart = reshapeCart(data.cartCreate.cart);
  if (!cart) throw new Error("No se pudo crear el carrito.");
  return cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: /* GraphQL */ `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) { ...CartFields }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId },
    noStore: true,
  });
  return reshapeCart(data.cart);
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart };
  }>({
    query: /* GraphQL */ `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines },
    noStore: true,
  });
  return reshapeCart(data.cartLinesAdd.cart)!;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart };
  }>({
    query: /* GraphQL */ `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines },
    noStore: true,
  });
  return reshapeCart(data.cartLinesUpdate.cart)!;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart };
  }>({
    query: /* GraphQL */ `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lineIds },
    noStore: true,
  });
  return reshapeCart(data.cartLinesRemove.cart)!;
}
