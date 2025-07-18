import Image from 'next/image';
import Link from 'next/link';

import { shopifyFetch } from '../../../lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '../../../lib/queries';

export default async function ProductDetail({
  params,
}: {
  params: { handle: string };
}) {
  // GraphQL‑fetch
  const { data } = await shopifyFetch<{ product: any }>(
    GET_PRODUCT_BY_HANDLE,
    { handle: params.handle }
  );

  const product = data.product;
  if (!product) {
    return <p className="text-center py-20">Product niet gevonden.</p>;
  }

  return (
    <article className="max-w-5xl mx-auto py-16 px-4 grid lg:grid-cols-2 gap-12">
      {product.images?.nodes?.[0] && (
        <Image
          src={product.images.nodes[0].url}
          alt={product.title}
          width={800}
          height={800}
          className="rounded-3xl shadow-lg w-full h-auto object-cover"
        />
      )}
      <div>
        <h1 className="font-serif text-3xl mb-4">{product.title}</h1>
        <div
          className="prose prose-invert"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
        <p className="mt-6 text-gold font-semibold text-xl">
          {Number(
            product.variants?.nodes?.[0]?.price?.amount ?? 0
          ).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
        </p>
        <Link
          href={product.onlineStoreUrl ?? '#'}
          className="inline-block mt-6 px-6 py-3 bg-gold text-navy rounded-full hover:opacity-90 transition"
        >
          Bestel nu
        </Link>
      </div>
    </article>
  );
}
