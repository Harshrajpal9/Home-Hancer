import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="section-wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div className="eyebrow">Home care, thoughtfully done</div>
            <h1 className="font-heading mt-7 max-w-[650px] text-[clamp(3.35rem,7vw,6.35rem)] font-extrabold leading-[.98] tracking-[-.075em] text-[#172c25]">
              Your home.<br />Our <span className="relative inline-block text-[#397457]">expertise.<span className="absolute -bottom-1 left-1 h-[7px] w-[92%] rounded-full bg-[#c7e36a] opacity-80" /></span>
            </h1>
            <p className="mt-7 max-w-[470px] text-[15px] leading-8 text-[#68736b] md:text-[17px]">
              From the little fixes to the big transformations, make every corner of your home feel just right.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[#174b3b] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(23,75,59,.16)] transition hover:-translate-y-1 hover:bg-[#28664f]">
                Let’s get started <ArrowUpRight size={18} />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-bold text-[#43564a] transition hover:bg-[#e9eee6]">
                Explore services <ArrowDown size={16} />
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#172c25]/10 pt-7">
              {['One team, many solutions', 'Care for every corner'].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#536158]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#e4edda] text-[#397457]"><Check size={12} /></span>{item}</div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1 }} className="relative">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#dce8c8] blur-3xl" />
            <div className="image-hover relative overflow-hidden rounded-[28px] rounded-bl-[110px] bg-[#d8ddd2]">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=88" alt="Warm, modern living room with natural textures" className="h-[440px] w-full object-cover md:h-[590px]" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14271f]/35 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/75">The feeling of home</p><p className="font-heading mt-2 text-2xl font-bold tracking-tight">Better, by design.</p></div>
                <a href="#about" aria-label="Discover Home Hancer" className="grid h-12 w-12 place-items-center rounded-full bg-[#c7e36a] text-[#172c25] transition hover:scale-105"><Play size={17} fill="currentColor" /></a>
              </div>
            </div>
            <div className="absolute -bottom-6 left-5 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-xl backdrop-blur md:-left-8">
              <p className="font-heading text-2xl font-extrabold text-[#174b3b]">A–Z</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#788078]">Home solutions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
