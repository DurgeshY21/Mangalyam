import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMoreHorizontal } from "react-icons/fi";
import { PiSealCheck } from "react-icons/pi";
import { routes } from "@/lib/routes";

// Illustrative ceremony plans for the homepage, not live wedding records.
const ceremonies = [
  {
    id: "haldi",
    title: "Haldi & Auspicious Snan",
    image: "/assets/ceremonies/haldi.png",
    alt: "A bride celebrating Haldi with family in a marigold-decorated palace courtyard",
    time: "Day 1 · Morning",
    venue: "Haveli Courtyard",
    guests: 180,
    description: "Phoolon ki holi coordination, authentic yellow silk dress codes, and organic floral paste logistics.",
    status: "100% Checklist Ready",
  },
  {
    id: "mehendi",
    title: "Mehendi & Sufi Soirée",
    image: "/assets/ceremonies/mehendi.png",
    alt: "A henna artist applying bridal mehendi beneath a flower-draped palace pavilion",
    time: "Day 1 · Evening",
    venue: "Zenana Gardens",
    guests: 250,
    description: "8 Henna master artists allocated, live acoustic Sufi troupe setup, and artisanal chaat pavilion.",
    status: "Artists & Sound Locked",
  },
  {
    id: "wedding",
    title: "Shubh Vivah & Varmala",
    image: "/assets/ceremonies/wedding.png",
    alt: "A bride and groom exchanging garlands at a lakeside mandap surrounded by flowers",
    time: "Day 2 · Muhurat 11:28 AM",
    venue: "Lakeview Mandap",
    guests: 450,
    description: "Panditji Vedic protocol, royal elephant/vintage carriage procession route, and sacred havan samagri.",
    status: "Fire Protocol Confirmed",
  },
  {
    id: "reception",
    title: "Grand Royal Reception",
    image: "/assets/ceremonies/reception.png",
    alt: "An elegant palace wedding reception with chandeliers and flower-filled banquet tables",
    time: "Day 3 · Evening",
    venue: "Palace Ballroom",
    guests: 500,
    description: "5-tier royal banquet, global guest reception protocols, red carpet media wall, and international symphony.",
    status: "Symphony Scheduled",
  },
] as const;

export function Ceremonies() {
  return (
    <section id="ceremonies" aria-labelledby="ceremonies-heading" className="scroll-mt-8 bg-[#faf2ec] py-[60px] text-[#260d22] max-[640px]:py-10">
      <div className="mx-auto w-[min(1400px,calc(100%-80px))] max-[1150px]:w-[calc(100%-64px)] max-[640px]:w-[calc(100%-36px)]">
        <div className="mb-6 flex items-end justify-between gap-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
          <div>
            <p className="mb-2 text-[9px] font-semibold tracking-[1px] text-[#8d6c0a] uppercase">Ritual Sequence &amp; Protocols</p>
            <h2 id="ceremonies-heading" className="mb-2 font-display text-[clamp(27px,2.6vw,38px)] leading-[1.18] tracking-[-0.8px]">Multi-Day Indian Wedding Orchestration</h2>
            <p className="max-w-[620px] text-xs leading-[1.7] text-[#796671]">Each sacred milestone carries unique traditions, catering rules, and guest subsets. Manage distinct production schedules with synchronized clarity.</p>
          </div>
          <a href="#ceremony-collection" className="mb-0.5 inline-flex shrink-0 items-center gap-2 text-xs text-plum underline-offset-4 hover:underline">
            Explore All Ceremonies <FiArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>

        <div id="ceremony-collection" className="grid scroll-mt-6 grid-cols-1 gap-[18px] min-[540px]:grid-cols-2 min-[1050px]:grid-cols-4">
          {ceremonies.map((ceremony) => (
            <article key={ceremony.id} id={`ceremony-${ceremony.id}`} className="group flex min-w-0 scroll-mt-6 flex-col rounded-xl border border-[#ede3dc] bg-white transition-shadow duration-200 hover:shadow-[0_8px_24px_#4317390d] motion-reduce:transition-none">
              <div className="relative aspect-[3/2] overflow-hidden rounded-t-[11px]">
                <Image
                  src={ceremony.image}
                  alt={ceremony.alt}
                  fill
                  sizes="(min-width: 1480px) 337px, (min-width: 1050px) 24vw, (min-width: 540px) 47vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span className={`absolute top-3 left-2.5 rounded px-2 py-1 text-[9px] leading-none font-bold uppercase shadow-sm ${ceremony.id === "wedding" ? "bg-plum text-white" : "bg-[#ffedae] text-[#654b0a]"}`}>
                  {ceremony.time}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pt-4 pb-3.5">
                <p className="mb-2 text-[9px] font-medium tracking-[0.1px] text-[#957225]">{ceremony.venue} <span aria-hidden="true">·</span> {ceremony.guests} Guests</p>
                <h3 className="mb-2 font-display text-[clamp(18px,1.5vw,23px)] leading-[1.25] tracking-[-0.3px]">{ceremony.title}</h3>
                <p className="mb-5 text-[11px] leading-[1.65] text-[#87737d]">{ceremony.description}</p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-[5px] text-[9px] font-medium text-[#8d6c0a]"><PiSealCheck aria-hidden="true" className="size-3.5 shrink-0" />{ceremony.status}</span>
                  <details className="relative shrink-0">
                    <summary aria-label={`More about ${ceremony.title}`} className="grid size-7 cursor-pointer list-none place-items-center rounded-full text-plum hover:bg-[#faf2ec] [&::-webkit-details-marker]:hidden"><FiMoreHorizontal aria-hidden="true" className="size-4" /></summary>
                    <div className="absolute right-0 bottom-full z-20 mb-2 w-56 rounded-lg border border-[#ede3dc] bg-white p-4 text-[11px] leading-relaxed text-[#796671] shadow-lg">
                      <p className="mb-1 font-semibold text-plum">{ceremony.title}</p>
                      <p>{ceremony.time}</p>
                      <p className="mb-3">{ceremony.venue} · {ceremony.guests} guests</p>
                      <Link href={routes.signup} className="inline-flex items-center gap-1 text-plum underline underline-offset-4">Plan your ceremony <FiArrowRight aria-hidden="true" /></Link>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
