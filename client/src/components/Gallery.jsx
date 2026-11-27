import { ArrowUpRight } from 'lucide-react'
const defaults = [
  { title: 'Spaces that feel like you', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85' },
  { title: 'Details make a difference', imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85' },
  { title: 'A fresh point of view', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85' }
]
export default function Gallery({ items = defaults }) {
  const visible = items.filter(item => item.active !== false)
  return <section id="gallery" className="bg-[#174b3b] py-20 text-white md:py-28"><div className="section-wrap">
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="eyebrow !text-[#c7e36a]">A little inspiration</div><h2 className="font-heading mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-.06em] md:text-6xl">Make room for<br />something better.</h2></div><p className="max-w-[330px] pb-1 text-sm leading-7 text-white/65">A visual moodboard for the thoughtful spaces and finishing touches we love.</p></div>
    <div className="mt-12 grid gap-5 md:grid-cols-3">{visible.map((item, index) => <article key={item._id || item.title} className={`image-hover group overflow-hidden rounded-[22px] ${index === 1 ? 'md:mt-10' : ''}`}><div className="relative overflow-hidden"><img src={item.imageUrl} alt={item.title} loading="lazy" className="h-[330px] w-full object-cover md:h-[390px]" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-[#174b3b]">{String(index + 1).padStart(2, '0')}</span></div><div className="flex items-center justify-between border-b border-white/20 py-5"><h3 className="font-heading text-lg font-bold tracking-tight">{item.title}</h3><ArrowUpRight size={19} className="text-[#c7e36a] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article>)}</div>
  </div></section>
}
