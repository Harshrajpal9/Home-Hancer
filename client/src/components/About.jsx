import { ArrowUpRight, Check } from 'lucide-react'

const points = ['Practical solutions for everyday home needs', 'A clear, friendly enquiry experience', 'Serving homes across Ahmedabad']

export default function About() {
  return (
    <section id="about" className="overflow-hidden py-20 md:py-28">
      <div className="section-wrap grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="image-hover overflow-hidden rounded-[26px] rounded-tr-[110px] bg-[#e2e5dc]">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85" alt="Beautifully finished contemporary home interior" loading="lazy" className="h-[420px] w-full object-cover md:h-[540px]" />
          </div>
          <div className="absolute -bottom-6 right-4 max-w-[210px] rounded-2xl bg-[#c7e36a] p-5 text-[#172c25] shadow-xl md:-right-7">
            <p className="font-heading text-3xl font-extrabold tracking-[-.06em]">Home,</p>
            <p className="text-sm font-semibold">handled with care.</p>
          </div>
        </div>
        <div className="lg:pl-7">
          <div className="eyebrow">A little about us</div>
          <h2 className="font-heading mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-.06em] md:text-6xl">The right help makes all the difference.</h2>
          <p className="mt-7 text-[15px] leading-8 text-[#737b73]">Home Hancer Services is focused on making property maintenance and home improvement simpler for people in Ahmedabad. From small repairs to bigger upgrades, our aim is to make the process easier to understand and easier to get started.</p>
          <div className="mt-7 space-y-4">
            {points.map(point => <div key={point} className="flex items-center gap-3 text-sm font-semibold text-[#43564a]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e4edda] text-[#397457]"><Check size={14} /></span>{point}</div>)}
          </div>
          <a href="#contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#174b3b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#28664f]">Get to know us <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  )
}
