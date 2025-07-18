// app/products/page.tsx
import Image from 'next/image';
import Link from 'next/link';

import { shopifyFetch } from '../../lib/shopify';
import { GET_ALL_PRODUCTS } from '../../lib/queries';

export default async function ProductsPage() {
  // 1) Haal alle producten op uit Shopify
  const data = await shopifyFetch<{ products: any }>(GET_ALL_PRODUCTS);
  const products = data.products.nodes;

  // 2) Toon loading of fout als nodig (optioneel)
  if (!products?.length) {
    return <p className="p-8 text-center">Geen producten gevonden.</p>;
  }

  // 3) Render grid met alle producten
  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif mb-8 text-center">Onze Collectie</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((prod: any) => (
          <Link
            key={prod.handle}
            href={`/product/${prod.handle}`}
            className="block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            <Image
              src={prod.images.nodes[0]?.url}
              alt={prod.title}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{prod.title}</h2>
              <p className="text-gold font-medium">
                {Number(prod.variants.nodes[0].price.amount).toLocaleString('nl-NL', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
