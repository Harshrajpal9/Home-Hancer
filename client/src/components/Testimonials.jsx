import { Quote, Star } from 'lucide-react'
const defaults = [
  { name: 'Akib Mansuri', text: 'Quick and satisfying service. Recommended to others in Ahmedabad.', rating: 5 },
  { name: 'Arman Ali', text: 'Recently had civil and tile work done. The result was very nice.', rating: 5 },
  { name: 'Ram Brish Kumar', text: 'Very nice painting work.', rating: 5 }
]
export default function Testimonials({ items = defaults }) {
  const visible = items.filter(item => item.active !== false)
  return <section id="reviews" className="py-20 md:py-28"><div className="section-wrap">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="eyebrow">Kind words</div><h2 className="font-heading mt-5 text-4xl font-extrabold tracking-[-.06em] md:text-6xl">Trust is built<br />one job at a time.</h2></div><p className="max-w-[310px] pb-1 text-sm leading-7 text-[#737b73]">Experiences from customers who have used our services.</p></div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">{visible.map((review, i) => <article key={review._id || review.name} className="rounded-[22px] border border-[#172c25]/10 bg-white p-7"><div className="flex items-center justify-between"><Quote size={25} className="text-[#397457]" /><span className="text-[10px] font-extrabold tracking-[.18em] text-[#9aa49a]">0{i + 1} / {String(visible.length).padStart(2, '0')}</span></div><div className="mt-7 flex gap-1 text-[#d59c39]">{Array.from({ length: Math.min(5, Math.max(1, review.rating || 5)) }, (_, n) => <Star key={n} size={14} fill="currentColor" />)}</div><p className="mt-5 min-h-[90px] text-[14px] leading-7 text-[#5e6b61]">“{review.text}”</p><div className="mt-7 border-t border-[#172c25]/10 pt-5"><p className="font-heading font-extrabold">{review.name}</p><p className="mt-1 text-[10px] font-semibold uppercase tracking-[.15em] text-[#929b91]">Customer</p></div></article>)}</div>
  </div></section>
}
