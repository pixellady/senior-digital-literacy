/** Light card surfaces for the senior-readable dashboard. */

export const surfacePage = "min-h-screen bg-white text-ink";

/** Brown body copy — same size as “Pick one task and get one clear step.” */
export const textBody = "text-xl font-light leading-[1.2] text-ink";

export const shadowCard =
  "shadow-[0_10px_30px_rgba(70,124,83,0.18)]";

export const shadowCardSoft =
  "shadow-[0_6px_16px_rgba(70,124,83,0.16)]";

export const surfaceCard =
  `rounded-2xl border border-forest/15 bg-white p-6 ${shadowCard}`;

export const surfaceInset =
  `rounded-xl border border-forest/15 bg-white p-4 ${shadowCardSoft}`;

export const surfaceSticky =
  `border-b border-forest/15 bg-white/95 px-4 py-4 ${shadowCardSoft} backdrop-blur-sm sm:px-8`;

export const btnPrimary =
  "min-h-11 min-w-11 rounded-xl bg-forest px-6 py-3 text-lg font-semibold text-white hover:bg-[#3e6f4a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:bg-[#b7c9b8]";

export const btnSecondary =
  "min-h-11 min-w-11 rounded-xl border-2 border-forest bg-white px-6 py-3 text-lg font-semibold text-forest hover:bg-white active:bg-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:border-[#8fbc98] disabled:text-[#8fbc98]";

export const btnSelected =
  "min-h-11 rounded-xl border-2 border-forest bg-forest px-6 py-3 text-lg font-semibold text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest";
