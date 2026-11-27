import { useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  ['Services', '#services'],
  ['About us', '#about'],
  ['Our work', '#gallery'],
  ['Reviews', '#reviews'],
]

export default function Navbar({ theme = 'light', onToggleTheme = () => {} }) {
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 border-b border-[#172c25]/10 bg-[#f7f6f1]/90 backdrop-blur-xl">
      <nav className="section-wrap flex h-[78px] items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="Home Hancer home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#174b3b] font-heading text-xl font-extrabold text-[#c7e36a]">h.</span>
          <span>
            <strong className="block font-heading text-[17px] font-extrabold leading-none tracking-[-.06em]">home hancer</strong>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-[.23em] text-[#788078]">Services · Ahmedabad</small>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[13px] font-semibold text-[#526057] transition hover:text-[#174b3b]">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#172c25]/15 text-[#174b3b] transition hover:bg-[#e9eee6]"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="hidden items-center gap-2 rounded-full bg-[#174b3b] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-[#28664f] md:inline-flex">
            Book a service <ArrowUpRight size={16} />
          </a>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-[#172c25]/15 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#172c25]/10 bg-[#f7f6f1] px-5 pb-6 pt-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-[#e9eee6]">{label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#174b3b] px-5 py-3.5 text-sm font-bold text-white">Book a service <ArrowUpRight size={16} /></a>
          </div>
        </div>
      )}
    </header>
  )
}
