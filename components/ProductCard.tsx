import { Product } from '@/types';
import { Star, Check, X, ExternalLink, Zap, Trophy, Award } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  rank?: number;       // 1 = top pick, 2 = runner up, 3 = third
  bestForLabel?: string; // e.g. "Best Budget", "Best Overall", "Best Premium"
}

const categoryIcons: Record<string, string> = {
  seating:          '🪑',
  'budget-headset': '🎧',
  microphone:       '🎙️',
  'fps-mouse':      '🎯',
  'sweaty-hands':   '🖱️',
  keyboard:         '⌨️',
  monitor:          '🖥️',
  streaming:        '📡',
  'wrist-pain':     '💪',
  lighting:         '💡',
  controller:       '🎮',
  networking:       '📶',
  desk:             '🗂️',
  'headset-comfort':'👂',
  'budget-mouse':   '🖱️',
};

const rankConfig = {
  1: {
    label: 'Top Pick',
    icon: Trophy,
    border: 'border-purple-500/40',
    hoverBorder: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-[0_8px_40px_rgba(139,92,246,0.2)]',
    shimmer: 'card-shimmer',
    badgeBg: 'bg-gradient-to-r from-purple-600 to-violet-500',
    btnClass: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
  },
  2: {
    label: 'Runner Up',
    icon: Award,
    border: 'border-slate-700/60',
    hoverBorder: 'hover:border-slate-500/50',
    shadow: 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
    shimmer: '',
    badgeBg: 'bg-slate-700',
    btnClass: 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/25 hover:border-white/40 font-semibold',
  },
  3: {
    label: 'Also Great',
    icon: Award,
    border: 'border-slate-800/60',
    hoverBorder: 'hover:border-slate-600/50',
    shadow: 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
    shimmer: '',
    badgeBg: 'bg-slate-800',
    btnClass: 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/25 hover:border-white/40 font-semibold',
  },
};

const bestForColors: Record<string, string> = {
  'Best Overall': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Best Budget':  'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
  'Best Premium': 'bg-amber-500/12 text-amber-300 border-amber-500/25',
  'Best Value':   'bg-cyan-500/12 text-cyan-300 border-cyan-500/25',
};

export default function ProductCard({ product, rank = 3, bestForLabel }: ProductCardProps) {
  const cfg = rankConfig[rank as 1 | 2 | 3] ?? rankConfig[3];
  const RankIcon = cfg.icon;
  const icon = categoryIcons[product.category] ?? '🎮';

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.floor(rating)
            ? 'fill-amber-400 text-amber-400'
            : i < rating
            ? 'fill-amber-400/40 text-amber-400'
            : 'text-slate-700'
        }`}
      />
    ));

  return (
    <div
      className={`
        ${cfg.shimmer}
        relative flex flex-col overflow-hidden rounded-2xl border
        bg-gradient-to-b from-[#0f0f1c] to-[#080810]
        transition-all duration-300
        hover:-translate-y-1.5
        ${cfg.border} ${cfg.hoverBorder} ${cfg.shadow}
      `}
    >
      {/* Rank badge */}
      <div className="absolute left-3 top-3 z-20">
        <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${cfg.badgeBg}`}>
          <RankIcon className="h-3 w-3" />
          {cfg.label}
        </div>
      </div>

      {/* Best-for label (from solve page) — takes priority over product badge */}
      {bestForLabel ? (
        <div className="absolute right-3 top-3 z-20">
          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${bestForColors[bestForLabel] ?? 'bg-white/10 text-slate-300 border-white/10'}`}>
            {bestForLabel}
          </span>
        </div>
      ) : product.badge ? (
        <div className="absolute right-3 top-3 z-20">
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
            {product.badge}
          </span>
        </div>
      ) : null}

      {/* Image / visual area */}
      <div
        className="relative h-44 w-full flex-shrink-0 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)` }}
      >
        {/* Gradient overlay — stronger at bottom so text is legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Glow orb — top pick only */}
        {rank === 1 && (
          <div className="absolute left-1/2 top-1/3 h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-2xl" />
        )}

        {/* Large centred category emoji */}
        <div className="absolute inset-0 flex items-center justify-center pb-8">
          <span className="text-5xl drop-shadow-lg select-none">{icon}</span>
        </div>

        {/* Product name + placeholder notice at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <p className="truncate text-[13px] font-semibold leading-tight text-white/90">
            {product.name}
          </p>
          <p className="mt-0.5 text-[10px] text-white/35">
            Illustration · verify image before purchase
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">

        {/* Name + stars */}
        <div>
          <h3 className="mb-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-purple-300 lg:text-[17px]">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
            <span className="text-sm font-semibold text-amber-400">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-600">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-white">{product.price}</span>
          <span className="text-xs text-slate-600">approx. retail</span>
        </div>

        {/* Why it solves the problem */}
        <div className={`rounded-xl border p-3.5 ${rank === 1 ? 'border-purple-500/20 bg-purple-500/8' : 'border-white/8 bg-white/[0.03]'}`}>
          <div className="mb-1.5 flex items-center gap-1.5">
            <Zap className={`h-3 w-3 ${rank === 1 ? 'text-purple-400' : 'text-slate-500'}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-widest ${rank === 1 ? 'text-purple-400' : 'text-slate-500'}`}>
              Why this fixes it
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{product.whySolves}</p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Pros</p>
            <ul className="space-y-1.5">
              {product.pros.slice(0, 3).map((pro, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  <span className="text-[11px] leading-snug text-slate-400">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-400">Cons</p>
            <ul className="space-y-1.5">
              {product.cons.slice(0, 3).map((con, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <X className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                  <span className="text-[11px] leading-snug text-slate-400">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA button */}
        <a
          href={product.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${cfg.btnClass}`}
        >
          View Product
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
