import { FiStar } from "react-icons/fi";

const highlights = [
  { value: "₹180Cr+", label: "Nuptial Budgets Tracked" },
  { value: "450k+", label: "VVIP Guests Welcomed" },
  { value: "98%", label: "On-Time Vendor Milestones" },
  { value: "24/7", label: "Dedicated Royal Concierge" },
] as const;

export function Testimonial() {
  return (
    <section
      id="stories"
      aria-label="A royal wedding story and platform highlights"
      className="scroll-mt-8 bg-[#25031f] bg-[radial-gradient(ellipse_at_bottom_left,#53332e_0%,transparent_42%)] pt-[92px] pb-[96px] text-[#fff8f0] max-[640px]:py-14"
    >
      <div className="mx-auto w-[min(1400px,calc(100%-80px))] max-[1150px]:w-[calc(100%-64px)] max-[640px]:w-[calc(100%-36px)]">
        <figure className="mx-auto max-w-[1050px] text-center">
          <div className="mb-6 flex justify-center gap-[6px] text-[#ffe168]" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => (
              <FiStar key={index} aria-hidden="true" className="size-[19px] stroke-[1.8] max-[640px]:size-4" />
            ))}
          </div>
          <blockquote className="font-display text-[clamp(24px,2.55vw,38px)] leading-[1.6] tracking-[-0.5px] italic max-[640px]:text-[23px] max-[640px]:leading-[1.55]">
            <p>“We planned our 3-day Udaipur destination wedding with 450 guests across 4 continents without a single missing detail or stressed phone call. Mangalyam transformed our monumental chaos into sheer regal poetry.”</p>
          </blockquote>
          <figcaption className="mt-6 max-[640px]:mt-5">
            <p className="text-sm font-semibold text-[#ffe168]">Meera &amp; Devrat Singhania</p>
            <p className="mt-1 text-[10px] leading-normal text-[#e9dbe5]">The Leela Palace, Udaipur · Destination Wedding</p>
          </figcaption>
        </figure>

        <dl className="mt-16 grid grid-cols-4 gap-x-6 gap-y-9 text-center max-[640px]:mt-12 max-[640px]:grid-cols-2 max-[640px]:gap-x-4">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="flex min-w-0 flex-col items-center">
              <dt className="order-2 mt-2 text-[10px] leading-[1.5] font-medium tracking-[0.3px] text-[#fff8f0] uppercase max-[640px]:max-w-[150px] max-[640px]:text-[9px]">{highlight.label}</dt>
              <dd className="order-1 font-display text-[clamp(36px,4vw,60px)] leading-none tracking-[-1.5px] text-[#ffe168] max-[640px]:text-[38px]">{highlight.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
