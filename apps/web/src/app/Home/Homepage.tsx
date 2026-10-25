import Link from "next/link";
import { FiCheckCircle, FiMapPin, FiMessageSquare, FiPlayCircle, FiShield, FiStar, FiUsers } from "react-icons/fi";
import { PiConfetti, PiCrownSimple, PiSealCheck, PiTimer } from "react-icons/pi";
import { routes } from "@/lib/routes";
import { Ceremonies } from "./Ceremonies";
import { SharedWorkspace } from "./SharedWorkspace";
import { Testimonial } from "./Testimonial";
import { AdvisoryBanner } from "./AdvisoryBanner";

export function HomePage() {
  return (
    <>
    <section className="overflow-clip bg-[radial-gradient(ellipse_at_0%_8%,#fff0cf_0%,transparent_43%),radial-gradient(ellipse_at_94%_100%,#fceaf2_0%,transparent_42%)] bg-[#fff8f5] pt-[92px] pb-[84px] text-[#260d22] max-[1150px]:py-[76px] max-[480px]:pt-[46px] max-[480px]:pb-[55px] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-gold [&_a:focus-visible]:outline-offset-4 [&_summary:focus-visible]:outline-2 [&_summary:focus-visible]:outline-gold [&_summary:focus-visible]:outline-offset-4" aria-labelledby="hero-title" id="planning">
      <div className="mx-auto grid w-[min(1400px,calc(100%-80px))] grid-cols-[minmax(0,1.3fr)_minmax(350px,0.9fr)] items-center gap-[clamp(36px,5.5vw,90px)] min-[1500px]:grid-cols-[1.25fr_1fr] min-[1500px]:gap-[100px] max-[1150px]:w-[calc(100%-64px)] max-[1150px]:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.9fr)] max-[1150px]:gap-10 max-[850px]:max-w-[660px] max-[850px]:grid-cols-1 max-[480px]:w-[calc(100%-36px)] max-[480px]:gap-[34px]">
        <div className="pt-2.5 pb-6 max-[850px]:pb-0 [&_h1]:mb-[22px] [&_h1]:font-display [&_h1]:text-[clamp(38px,3.9vw,61px)] [&_h1]:leading-[1.15] [&_h1]:font-normal [&_h1]:tracking-[-2px] max-[1150px]:[&_h1]:text-[42px] max-[850px]:[&_h1]:text-[clamp(39px,6vw,55px)] max-[480px]:[&_h1]:text-[38px] max-[480px]:[&_h1]:tracking-[-1.3px] [&_h1_em]:font-normal [&_h1_em]:text-[#886503]">
          <div className="mb-[22px] inline-flex items-center gap-[7px] rounded-[30px] bg-[#f2ebe4] px-3.5 py-[7px] text-[10px] leading-normal font-medium [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-[#8d6c0a] max-[1150px]:px-2.5 max-[1150px]:py-1.5 max-[1150px]:text-[8px] max-[850px]:text-[9px] max-[480px]:mb-5 max-[480px]:items-start max-[480px]:py-[7px] max-[480px]:text-[8px] max-[480px]:leading-[1.65] max-[480px]:[&>svg]:mt-0.5"><FiStar aria-hidden="true" /><span>4.9/5 by 12,000+ Royal Families &amp; Planners <span className="px-0.5">•</span> Auspicious Muhurat 2025–2027</span></div>
          <p className="mb-[13px] text-[9px] font-bold tracking-[1.1px] text-[#795704] uppercase">The Sovereign Nuptial Suite</p>
          <h1 id="hero-title">Crafting Timeless <em>Indian<br className="max-[850px]:hidden" /> Weddings,</em> Together.</h1>
          <p className="mb-[26px] max-w-[650px] text-[15px] leading-[1.8] font-normal text-[#644f59] max-[1150px]:text-sm max-[850px]:max-w-[590px] max-[850px]:text-[15px] max-[480px]:text-sm">One centralized royal workspace for couples, families &amp; master planners. From sacred Haldi rituals to the Grand Reception, orchestrate every golden memory with effortless grace and zero chaos.</p>
          <div className="flex flex-wrap items-center gap-4 max-[480px]:gap-3">
            <Link className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[30px] bg-plum px-7 py-3 text-xs font-semibold text-[#fff9ef] shadow-[0_3px_5px_#43173920] transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-[#59254f] motion-reduce:transition-none [&_svg]:text-lg [&_svg]:text-[#f3cd63] max-[1150px]:px-5 max-[1150px]:py-[11px] max-[1150px]:text-[11px] max-[480px]:px-[19px] max-[480px]:py-3" href={routes.signup}><PiCrownSimple aria-hidden="true" />Start Free Planning</Link>
            <a className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[30px] bg-[#f2ebe4] px-7 py-3 text-xs font-medium text-plum transition-[background,transform] duration-150 hover:bg-[#eadecf] motion-reduce:transition-none [&_svg]:text-lg [&_svg]:text-[#997000] max-[1150px]:px-5 max-[1150px]:py-[11px] max-[1150px]:text-[11px] max-[480px]:px-[19px] max-[480px]:py-3" href="#workspace-preview"><FiPlayCircle aria-hidden="true" />Explore Royal Demo</a>
          </div>
          <ul className="mt-[27px] flex list-none flex-wrap gap-x-6 gap-y-[13px] p-0 text-[10px] leading-normal text-[#66525b] [&_li]:flex [&_li]:items-center [&_li]:gap-[7px] [&_svg]:size-[13px] [&_svg]:shrink-0 [&_svg]:text-[#997000] max-[1150px]:gap-3 max-[1150px]:text-[9px] max-[480px]:mt-[22px] max-[480px]:gap-x-[18px]">
            <li><FiCheckCircle aria-hidden="true" />No credit card required</li>
            <li><FiCheckCircle aria-hidden="true" />Built for Multi-Day Celebrations</li>
            <li><FiShield aria-hidden="true" />Complete Family Privacy</li>
          </ul>
        </div>

        <div className="relative pb-[34px] max-[850px]:w-[min(100%,460px)] max-[850px]:justify-self-center">
          <article className="relative scroll-mt-[35px] rounded-[14px] border border-white bg-white p-6 shadow-[0_18px_28px_-12px_#43173938,0_3px_8px_#43173907] target:outline-2 target:outline-[#bf9a43] target:outline-offset-6 max-[1150px]:p-5 max-[480px]:rounded-xl max-[480px]:p-4" id="workspace-preview" aria-label="Illustrative wedding workspace preview" tabIndex={-1}>
            <div className="relative pb-5 max-[480px]:pt-[27px] max-[480px]:pb-4 [&_h2]:mb-1.5 [&_h2]:font-display [&_h2]:text-[clamp(19px,1.7vw,25px)] [&_h2]:leading-[1.2] [&_h2]:font-normal [&_h2]:tracking-[-0.5px] [&_h2]:text-[#4b3043] max-[850px]:[&_h2]:text-2xl max-[480px]:[&_h2]:text-[23px]">
              <div><p className="mb-1.5 pr-[138px] text-[8px] leading-normal font-bold tracking-[0.3px] text-[#8a762e] uppercase max-[1150px]:pr-[125px] max-[1150px]:text-[7px] max-[850px]:text-[8px] max-[480px]:pr-0">Live Nuptial Master Workspace</p><h2>Ananya &amp; Kabir’s Nuptials</h2><p className="m-0 flex items-center gap-1 text-[10px] leading-normal text-[#857a7b] [&_svg]:size-3 [&_svg]:text-[#9b862e]"><FiMapPin aria-hidden="true" />The Rambagh Palace, Jaipur</p></div>
              <span className="absolute top-0 right-0 inline-flex items-center gap-1 rounded-[20px] bg-[#ffe28d] px-2 py-[5px] text-[8px] font-bold whitespace-nowrap text-[#775708] [&_svg]:size-3 max-[1150px]:text-[7px] max-[480px]:right-auto max-[480px]:left-0 max-[480px]:text-[8px]"><PiTimer aria-hidden="true" />84 Days to Muhurat</span>
            </div>
            <div className="rounded-lg bg-[#faf3ed] px-[17px] py-[18px] max-[480px]:px-3 max-[480px]:py-[15px]">
              <div className="flex items-center justify-between gap-2 [&_h3]:m-0 [&_h3]:font-sans [&_h3]:text-xs [&_h3]:font-semibold [&>span]:text-[9px] [&>span]:whitespace-nowrap [&>span]:text-[#594e50] max-[480px]:[&_h3]:text-[11px]"><h3>Royal Budget Allocation</h3><span>• 84% Tracked</span></div>
              <div className="mt-2.5 mb-2 flex flex-wrap items-baseline justify-between gap-[5px] [&_strong]:font-display [&_strong]:text-[clamp(24px,2vw,31px)] [&_strong]:font-normal [&_strong]:tracking-[-0.5px] [&>span]:text-[10px] [&>span]:font-semibold [&>span]:text-[#8e8381] max-[850px]:[&_strong]:text-[30px] max-[480px]:[&_strong]:text-[26px] max-[480px]:[&>span]:text-[9px]"><strong>₹42,00,000</strong><span>of ₹50,00,000 Cap</span></div>
              <div className="h-[7px] overflow-hidden rounded-[20px] bg-[#e7dfd8] [&>span]:block [&>span]:h-full [&>span]:w-[84%] [&>span]:rounded-[inherit] [&>span]:bg-[#8b710a]" role="progressbar" aria-label="Sample wedding budget tracked" aria-valuemin={0} aria-valuemax={100} aria-valuenow={84}><span /></div>
            </div>
            <div className="my-3.5 grid grid-cols-2 gap-3">
              <div className="rounded-[7px] bg-[#f4ede7] p-4 [&>p]:mt-3 [&>p]:mb-[3px] [&>p]:font-display [&>p]:text-[23px] [&>p]:leading-none [&>p]:text-[#523449] [&>p>span]:text-[19px] [&>strong]:text-[10px] [&>strong]:font-semibold [&>strong]:text-[#8d7629] max-[480px]:px-3 max-[480px]:py-3.5 max-[480px]:[&>strong]:text-[9px]"><div className="flex items-center justify-between gap-2 [&>span]:text-[8px] [&>span]:font-bold [&>span]:text-[#7a7270] [&>span]:uppercase [&_svg]:text-sm [&_svg]:text-[#9b832e]"><span>RSVP Confirmed</span><FiUsers aria-hidden="true" /></div><p>340 <span>/ 380</span></p><strong>90% Attendance</strong></div>
              <div className="rounded-[7px] bg-[#f4ede7] p-4 [&>p]:mt-3 [&>p]:mb-[3px] [&>p]:font-display [&>p]:text-[23px] [&>p]:leading-none [&>p]:text-[#523449] [&>p>span]:text-[19px] [&>strong]:text-[10px] [&>strong]:font-semibold [&>strong]:text-[#8d7629] max-[480px]:px-3 max-[480px]:py-3.5 max-[480px]:[&>strong]:text-[9px]"><div className="flex items-center justify-between gap-2 [&>span]:text-[8px] [&>span]:font-bold [&>span]:text-[#7a7270] [&>span]:uppercase [&_svg]:text-sm [&_svg]:text-[#9b832e]"><span>Curated Guild</span><PiSealCheck aria-hidden="true" /></div><p>9 <span>of</span> 12</p><strong className="!text-[#7c5c72]">Locked &amp; Under Escrow</strong></div>
            </div>
            <div className="relative flex items-center gap-2.5 rounded-[7px] bg-plum px-[13px] py-4 text-white max-[1150px]:gap-2 max-[1150px]:px-2.5 max-[1150px]:py-3.5 max-[480px]:flex-wrap">
              <span className="grid size-[38px] shrink-0 place-items-center rounded-full bg-white/12 text-[21px] text-[#e8c267] max-[1150px]:size-[30px] max-[1150px]:text-lg"><PiConfetti aria-hidden="true" /></span>
              <div className="min-w-0 [&>p]:mb-1 [&>p]:text-[8px] [&>p]:font-bold [&>p]:text-[#e2bf61] [&>p]:uppercase [&_h3]:mb-1 [&_h3]:font-sans [&_h3]:text-[13px] [&_h3]:font-semibold [&>span]:text-[9px] [&>span]:leading-normal [&>span]:text-[#cfb5ca] max-[1150px]:[&_h3]:text-xs max-[850px]:[&_h3]:text-sm max-[850px]:[&>span]:text-[10px] max-[480px]:[&_h3]:text-xs max-[480px]:[&>span]:text-[9px]"><p>Next Ceremonial Stage</p><h3>Sangeet &amp; Sufi Night</h3><span>Nov 14, 7:00 PM · Subhash Lawn</span></div>
              <details className="ml-auto shrink-0 max-[480px]:ml-[38px] [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:rounded-[20px] [&_summary]:bg-white/20 [&_summary]:px-2 [&_summary]:py-[5px] [&_summary]:text-[8px] [&_summary]:font-semibold [&_summary]:whitespace-nowrap [&_summary::-webkit-details-marker]:hidden [&[open]_summary]:bg-white/30 max-[1150px]:[&_summary]:px-1.5 max-[1150px]:[&_summary]:text-[7px] max-[480px]:[&_summary]:text-[8px] [&>div]:absolute [&>div]:top-[calc(100%+8px)] [&>div]:right-0 [&>div]:z-20 [&>div]:w-[270px] [&>div]:rounded-lg [&>div]:border [&>div]:border-[#eee1e8] [&>div]:bg-white [&>div]:p-[18px] [&>div]:text-[11px] [&>div]:leading-[1.6] [&>div]:text-plum [&>div]:shadow-[0_10px_30px_#43173925] [&_ul]:mt-2.5 [&_ul]:list-disc [&_ul]:pl-[15px]"><summary>Live Run-Sheet</summary><div><strong>Sample evening schedule</strong><ul><li>7:00 PM · Guest welcome</li><li>7:30 PM · Family performances</li><li>8:30 PM · Sufi night &amp; dinner</li></ul></div></details>
            </div>
          </article>
          <div className="absolute bottom-[13px] -left-6 flex max-w-[calc(100%+20px)] items-center gap-[9px] rounded-lg bg-white pt-[9px] pr-[13px] pb-[9px] pl-[9px] shadow-[0_10px_20px_#43173927] [&_p]:mb-[3px] [&_p]:text-[8px] [&_p]:font-bold [&_p]:tracking-[0.5px] [&_p]:text-[#8d6c0a] [&_p]:uppercase [&_div>span]:block [&_div>span]:text-[10px] [&_div>span]:leading-[1.4] [&_div>span]:text-[#5f5557] max-[850px]:-left-3 max-[480px]:-left-1.5 max-[480px]:max-w-[calc(100%+12px)] max-[480px]:gap-[7px] max-[480px]:p-2 max-[480px]:[&_div>span]:text-[9px]"><span className="grid size-[29px] shrink-0 place-items-center rounded-full bg-[#ffe38f] text-base text-[#795503]"><FiMessageSquare aria-hidden="true" /></span><div><p>WhatsApp RSVP Sync</p><span>Uncle Rajesh confirmed +3 guests (Jain Meal)</span></div></div>
          <p className="absolute right-[3px] -bottom-3 m-0 text-[9px] text-[#95848c]">Illustrative workspace preview</p>
        </div>
      </div>
    </section>
    <Ceremonies />
    <SharedWorkspace />
    <Testimonial />
    <AdvisoryBanner />
    </>
  );
}
