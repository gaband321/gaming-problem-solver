import { Product } from '@/types';
import { Star, Check, X } from 'lucide-react';

interface ComparisonTableProps {
  products: Product[];
  bestForLabels: string[];
}

// Parse price string to number for comparison
function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$,]/g, '')) || 0;
}

// Render compact star row
function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-xs text-slate-600">/ 5</span>
    </span>
  );
}

const bestForColors: Record<string, string> = {
  'Best Overall': 'text-purple-300 bg-purple-500/15 border-purple-500/30',
  'Best Budget':  'text-emerald-300 bg-emerald-500/12 border-emerald-500/25',
  'Best Premium': 'text-amber-300 bg-amber-500/12 border-amber-500/25',
  'Best Value':   'text-cyan-300 bg-cyan-500/12 border-cyan-500/25',
};

export default function ComparisonTable({ products, bestForLabels }: ComparisonTableProps) {
  if (products.length < 2) return null;

  const prices = products.map(p => parsePrice(p.price));
  const maxRating = Math.max(...products.map(p => p.rating));

  const rows: Array<{
    label: string;
    render: (product: Product, index: number) => React.ReactNode;
  }> = [
    {
      label: 'Best For',
      render: (_, i) => (
        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${bestForColors[bestForLabels[i]] ?? 'text-slate-300 bg-white/5 border-white/10'}`}>
          {bestForLabels[i]}
        </span>
      ),
    },
    {
      label: 'Price',
      render: (p, i) => (
        <span className={`text-sm font-bold ${prices[i] === Math.min(...prices) ? 'text-emerald-400' : 'text-white'}`}>
          {p.price}
        </span>
      ),
    },
    {
      label: 'Rating',
      render: (p) => (
        <span className={p.rating === maxRating ? 'text-amber-400' : ''}>
          <MiniStars rating={p.rating} />
        </span>
      ),
    },
    {
      label: 'Top Advantage',
      render: (p) => (
        <span className="flex items-start gap-1.5 text-xs text-slate-300">
          <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
          {p.pros[0]}
        </span>
      ),
    },
    {
      label: 'Main Tradeoff',
      render: (p) => (
        <span className="flex items-start gap-1.5 text-xs text-slate-500">
          <X className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
          {p.cons[0]}
        </span>
      ),
    },
    {
      label: 'Reviews',
      render: (p) => (
        <span className="text-xs text-slate-500">
          {p.reviewCount.toLocaleString()}+ reviews
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Side-by-side comparison
        </p>
        <h3 className="text-sm font-bold text-white">Compare All Three</h3>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="w-36 py-3 pl-5 pr-2 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Feature
              </th>
              {products.map((p, i) => (
                <th key={p.id} className="px-4 py-3 text-left">
                  <p className="text-xs font-bold text-white leading-tight">{p.name.split(' ').slice(0, 3).join(' ')}</p>
                  <p className={`mt-0.5 text-[10px] font-medium ${bestForColors[bestForLabels[i]]?.split(' ')[0] ?? 'text-slate-500'}`}>
                    {bestForLabels[i]}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={row.label}
                className={`border-b border-white/[0.04] ${rowIdx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              >
                <td className="py-3.5 pl-5 pr-2 text-xs font-medium text-slate-600 align-top whitespace-nowrap">
                  {row.label}
                </td>
                {products.map((p, i) => (
                  <td key={p.id} className="px-4 py-3.5 align-top">
                    {row.render(p, i)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="border-t border-white/[0.04] px-5 py-3">
        <p className="text-[10px] text-slate-700">
          Prices are approximate retail. Recommendations are based on problem fit, features, reviews, and value — not commission potential.
        </p>
      </div>
    </div>
  );
}
