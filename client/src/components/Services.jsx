import { motion } from 'framer-motion'
import { ArrowUpRight, Wrench, Zap, Paintbrush, Hammer, Snowflake, Bath, House, Sparkles } from 'lucide-react'

const iconMap = { Wrench, Zap, Paintbrush, Hammer, Snowflake, Bath, House, Sparkles }

export default function Services({ items = [] }) {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="section-wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><div className="eyebrow">What we can do for you</div><h2 className="font-heading mt-5 max-w-[600px] text-4xl font-extrabold leading-[1.08] tracking-[-.06em] md:text-6xl">Everyday care.<br /><span className="text-[#397457]">Extraordinary ease.</span></h2></div>
          <p className="max-w-[330px] pb-1 text-sm leading-7 text-[#737b73]">A considered range of home maintenance and improvement services, all in one place.</p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.filter(item => item.active !== false).map((item, i) => {
            const Icon = iconMap[item.icon] || House
            return <motion.a href="#contact" key={item._id || item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .06 }} className="group relative min-h-[250px] overflow-hidden rounded-[22px] border border-[#172c25]/10 bg-[#f8f8f4] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#174b3b]/30 hover:bg-[#174b3b] hover:shadow-[0_20px_50px_rgba(23,75,59,.12)]">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8eee2] text-[#28664f] transition group-hover:bg-[#c7e36a] group-hover:text-[#172c25]"><Icon size={22} strokeWidth={1.8} /></span><span className="font-heading text-sm font-bold text-[#9ba49a] transition group-hover:text-white/40">{item.number || String(i + 1).padStart(2, '0')}</span></div>
              <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8a978b] transition group-hover:text-[#c7e36a]">{item.tag || 'Home care'}</p>
              <h3 className="font-heading mt-2 text-[22px] font-extrabold tracking-[-.04em] text-[#172c25] transition group-hover:text-white">{item.title}</h3>
              <p className="mt-2 max-w-[290px] text-[13px] leading-6 text-[#778078] transition group-hover:text-white/65">{item.description}</p>
              <span className="absolute bottom-7 right-7 grid h-9 w-9 place-items-center rounded-full border border-[#172c25]/15 text-[#174b3b] transition group-hover:border-white/30 group-hover:bg-white group-hover:text-[#174b3b]"><ArrowUpRight size={17} /></span>
            </motion.a>
          })}
        </div>
      </div>
    </section>
  )
}
