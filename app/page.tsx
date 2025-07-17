import { shopifyFetch } from '../../lib/shopify';
import { GET_ALL_PRODUCTS } from '../../lib/queries';

import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Image src="/hero-placeholder.jpg" width={1600} height={900} alt="Eternal Ateliers hero" className="w-full max-h-[70vh] object-cover rounded-2xl shadow-lg" />
      <h1 className="mt-8 font-serif text-4xl md:text-6xl">Eternal Ateliers</h1>
      <p className="mt-4 max-w-xl mx-auto text-lg text-white/80">
        Luxe en moderne bureaus, vervaardigd uit hoogwaardige materialen voor een leven lang vakmanschap.
      </p>
      <Link href="/products" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gold text-navy font-medium hover:opacity-90 transition">
        Bekijk Collectie <ArrowRight size={18} />
      </Link>
    </main>
  );
}
