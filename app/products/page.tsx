import { shopifyFetch } from '@/lib/shopify';
import { GET_ALL_PRODUCTS } from '@/lib/queries';
import Link from 'next/link';
import Image from 'next/image';

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: { url: string; altText?: string; width: number; height: number };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

export default async function ProductsPage() {
  const data = await shopifyFetch<{ products: { nodes: ProductNode[] } }>(GET_ALL_PRODUCTS);
  const products = data.products.nodes;

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link key={p.id} href={`/product/${p.handle}`} className="group block bg-white text-navy rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
          {p.featuredImage && (
            <Image src={p.featuredImage.url} alt={p.featuredImage.altText ?? p.title} width={p.featuredImage.width} height={p.featuredImage.height} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
          )}
          <div className="p-6">
            <h3 className="font-serif text-xl mb-2">{p.title}</h3>
            <p className="text-gold font-medium">
              €{Number(p.priceRange.minVariantPrice.amount).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
