// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

import { shopifyFetch } from '../lib/shopify';
import { GET_ALL_PRODUCTS } from '../lib/queries';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  // Haal alle producten op
  const { data } = await shopifyFetch<{ products: any }>(
    GET_ALL_PRODUCTS
  );
  const products = data.products.nodes;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Hero */}
      <Image
        src="/hero-placeholder.jpg"
        width={1600}
        height={900}
        alt="Eternal Ateliers hero"
        className="w-full max-h-[70vh] object-cover rounded-2xl shadow-lg"
      />

      <h1 className="mt-8 font-serif text-4xl md:text-6xl">Eternal Ateliers</h1>
      <p className="mt-4 max-w-xl mx-auto text-lg text-white/80">
        Luxe en moderne bureaus, vervaardigd uit hoogwaardige materialen voor een
        leven lang vakmanschap.
      </p>

      {/* Collectie-link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gold text-navy font-medium hover:opacity-90 transition"
      >
        Bekijk Collectie <ArrowRight size={18} />
      </Link>

      {/* Optioneel: een eenvoudig productoverzicht onderaan */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, 3).map((prod: any) => (
          <Link
            key={prod.handle}
            href={`/product/${prod.handle}`}
            className="block overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src={prod.images.nodes[0]?.url}
              alt={prod.title}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <h2 className="mt-4 font-semibold">{prod.title}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
}
