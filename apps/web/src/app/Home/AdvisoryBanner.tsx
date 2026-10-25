import { FiCalendar, FiMessageSquare } from "react-icons/fi";

// Supply real destinations when booking and concierge channels are ready.
function getBookingUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function AdvisoryBanner() {
  const bookingUrl = getBookingUrl(process.env.NEXT_PUBLIC_BRIEFING_URL);
  // Reserved fictional number for the visual prototype; replace before launch.
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "12025550123").replace(/[\s()+-]/g, "");
  const whatsappUrl = whatsappNumber && /^[1-9]\d{6,14}$/.test(whatsappNumber)
    ? `https://wa.me/${whatsappNumber}`
    : undefined;
  const primaryClass = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-plum px-7 py-3 text-[11px] leading-normal font-semibold whitespace-nowrap text-white shadow-[0_3px_5px_#43173920] transition-colors enabled:hover:bg-[#59254f] disabled:cursor-not-allowed motion-reduce:transition-none";
  const secondaryClass = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] leading-normal font-medium whitespace-nowrap text-plum transition-colors enabled:hover:bg-[#fffaf0] disabled:cursor-not-allowed motion-reduce:transition-none";

  return (
    <section id="pricing" aria-labelledby="advisory-heading" className="scroll-mt-8 bg-[#fff8f5] py-12 max-[640px]:py-8">
      <div className="mx-auto w-[min(1400px,calc(100%-80px))] rounded-[15px] bg-[#f4ece6] bg-[radial-gradient(ellipse_at_top_right,#f6e9ce_0%,transparent_55%)] px-10 py-10 shadow-[0_7px_12px_-5px_#43173925] max-[1150px]:w-[calc(100%-64px)] max-[640px]:w-[calc(100%-36px)] max-[640px]:px-6 max-[640px]:py-7">
        <div className="flex items-center justify-between gap-8 max-[1100px]:flex-col max-[1100px]:items-start max-[640px]:gap-6">
          <div className="max-w-[690px]">
            <p className="mb-3 text-[9px] font-semibold tracking-[0.9px] text-[#8d6c0a] uppercase">Private Sovereign Nuptial Advisory</p>
            <h2 id="advisory-heading" className="mb-2 font-display text-[clamp(27px,2.5vw,38px)] leading-[1.18] tracking-[-0.7px] text-[#260d22]">Plan Your Auspicious Union With<br className="max-[480px]:hidden" /> Master Architects</h2>
            <p className="max-w-[650px] text-xs leading-[1.8] text-[#85717d]">Connect with our Senior Ceremonial Directors for an exclusive walkthrough of custom royal itineraries, heritage venue bookings, and budget models tailored to your family’s vision.</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3 max-[480px]:w-full max-[480px]:flex-col max-[480px]:items-stretch">
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${primaryClass} hover:bg-[#59254f]`}><FiCalendar aria-hidden="true" className="size-4 text-[#f3ce6e]" />Schedule Private Briefing</a>
            ) : (
              <button type="button" disabled title="Private briefing bookings will be available soon" className={primaryClass}><FiCalendar aria-hidden="true" className="size-4 text-[#f3ce6e]" />Schedule Private Briefing</button>
            )}
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${secondaryClass} hover:bg-[#fffaf0]`}><FiMessageSquare aria-hidden="true" className="size-4 text-[#8d6c0a]" />Instant WhatsApp Desk</a>
            ) : (
              <button type="button" disabled title="WhatsApp concierge will be available soon" className={secondaryClass}><FiMessageSquare aria-hidden="true" className="size-4 text-[#8d6c0a]" />Instant WhatsApp Desk</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
