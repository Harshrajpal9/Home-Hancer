import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#142c23] py-12 text-white">
      <div className="section-wrap">
        <div className="flex flex-col justify-between gap-9 md:flex-row md:items-end">
          <div>
            <a href="#home" className="inline-flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#c7e36a] font-heading text-xl font-extrabold text-[#172c25]">h.</span><span className="font-heading text-xl font-extrabold tracking-[-.06em]">home hancer</span></a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">Thoughtful home maintenance and improvement services in Ahmedabad.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-white/70">
            {['Home|#home', 'Services|#services', 'About|#about', 'Our work|#gallery', 'Contact|#contact'].map(item => { const [label, href] = item.split('|'); return <a key={label} href={href} className="transition hover:text-[#c7e36a]">{label}</a> })}
            <a href="tel:+919157691572" className="inline-flex items-center gap-1 text-[#c7e36a]">Call us <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[10px] text-white/40 sm:flex-row"><span>© {new Date().getFullYear()} Home Hancer Services. All rights reserved.</span><a href="#home" className="hover:text-white">Back to top ↑</a></div>
      </div>
    </footer>
  )
}
