import { HeartHandshake, ClipboardCheck, House } from 'lucide-react'

const reasons = [
  [HeartHandshake, 'People-first service', 'A friendly starting point for discussing what your home needs.'],
  [ClipboardCheck, 'Clear next steps', 'Share your requirement and make the next step easier to plan.'],
  [House, 'One place for home care', 'Explore multiple maintenance and improvement services together.'],
]

export default function WhyChooseUs() {
  return (
    <section className="bg-[#e9eee6] py-20 md:py-24">
      <div className="section-wrap">
        <div className="mx-auto max-w-[650px] text-center">
          <div className="eyebrow justify-center">Why Home Hancer</div>
          <h2 className="font-heading mt-5 text-4xl font-extrabold tracking-[-.06em] md:text-5xl">Good care is in the details.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#737b73]">A simpler way to take care of the place that matters most.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reasons.map(([Icon, title, description], index) => (
            <article key={title} className="rounded-[22px] bg-[#f8f8f4] p-8">
              <div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#174b3b] text-[#c7e36a]"><Icon size={24} strokeWidth={1.7} /></span><span className="font-heading text-sm font-bold text-[#a4ada2]">0{index + 1}</span></div>
              <h3 className="font-heading mt-7 text-xl font-extrabold tracking-[-.04em]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#737b73]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
