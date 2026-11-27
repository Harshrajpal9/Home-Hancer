import { useState } from 'react'
import { ArrowUpRight, Clock3, MapPin, Phone, Send } from 'lucide-react'
import { apiRequest } from '../lib/api'

export default function Contact({ services = [] }) {
  const [status, setStatus] = useState({ loading: false, message: '', error: false })
  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const enquiry = Object.fromEntries(data.entries())
    setStatus({ loading: true, message: '', error: false })
    try {
      await apiRequest('/enquiries', { method: 'POST', body: JSON.stringify(enquiry) })
      setStatus({ loading: false, message: 'Thanks! Your enquiry has been saved. Our team will contact you soon.', error: false })
      form.reset()
    } catch (error) {
      setStatus({ loading: false, message: `${error.message} You can also call us directly.`, error: true })
    }
  }
  const serviceList = services.filter(item => item.active !== false)
  return <section id="contact" className="bg-[#e9eee6] py-20 md:py-28"><div className="section-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
    <div><div className="eyebrow">Let’s talk about your home</div><h2 className="font-heading mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-.06em] md:text-6xl">A better home is one message away.</h2><p className="mt-6 max-w-[420px] text-sm leading-7 text-[#737b73]">Tell us a little about what you need. We’ll help you take the next step.</p>
      <div className="mt-10 space-y-5"><a href="tel:+919157691572" className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#174b3b]"><Phone size={20} /></span><span><small className="block text-xs text-[#818a80]">Call us</small><strong className="mt-1 block text-sm">+91 91576 91572</strong></span></a><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#174b3b]"><MapPin size={20} /></span><span><small className="block text-xs text-[#818a80]">Find us</small><strong className="mt-1 block text-sm">Vejalpur, Ahmedabad, Gujarat</strong></span></div><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#174b3b]"><Clock3 size={20} /></span><span><small className="block text-xs text-[#818a80]">Business hours</small><strong className="mt-1 block text-sm">Mon–Sat · 9 AM–8 PM</strong></span></div></div>
    </div>
    <form onSubmit={handleSubmit} className="rounded-[26px] bg-white p-6 shadow-[0_20px_60px_rgba(23,44,37,.07)] md:p-10">
      <div className="flex items-start justify-between gap-4"><div><p className="font-heading text-2xl font-extrabold tracking-[-.04em]">Tell us what you need.</p><p className="mt-2 text-sm text-[#818a80]">Your enquiry will be saved securely for our team.</p></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e9eee6] text-[#174b3b]"><Send size={18} /></span></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-bold text-[#526057]">Your name<input required minLength="2" maxLength="80" name="name" autoComplete="name" placeholder="e.g. Rahul Patel" className="mt-2 w-full rounded-xl border border-[#172c25]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-normal outline-none focus:border-[#397457]" /></label>
        <label className="text-xs font-bold text-[#526057]">Phone number<input required name="phone" type="tel" minLength="8" maxLength="20" autoComplete="tel" placeholder="+91 00000 00000" className="mt-2 w-full rounded-xl border border-[#172c25]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-normal outline-none focus:border-[#397457]" /></label>
        <label className="text-xs font-bold text-[#526057] sm:col-span-2">Service required<select required name="service" defaultValue="" className="mt-2 w-full rounded-xl border border-[#172c25]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-normal outline-none focus:border-[#397457]"><option value="" disabled>Select a service</option>{serviceList.map(item => <option key={item._id || item.title} value={item.title}>{item.title}</option>)}<option value="Other">Other</option></select></label>
        <label className="text-xs font-bold text-[#526057] sm:col-span-2">How can we help?<textarea required name="message" minLength="5" maxLength="2000" rows="4" placeholder="Describe the work you have in mind..." className="mt-2 w-full resize-y rounded-xl border border-[#172c25]/10 bg-[#f8f8f4] px-4 py-3.5 text-sm font-normal outline-none focus:border-[#397457]" /></label>
      </div>
      <button disabled={status.loading} type="submit" className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#174b3b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#28664f] disabled:opacity-60">{status.loading ? 'Sending enquiry…' : 'Send enquiry'} <ArrowUpRight size={17} /></button>
      {status.message && <p role="status" className={`mt-4 rounded-xl p-3 text-xs font-semibold ${status.error ? 'bg-red-50 text-red-700' : 'bg-[#e9eee6] text-[#174b3b]'}`}>{status.message}</p>}
    </form>
  </div></section>
}
