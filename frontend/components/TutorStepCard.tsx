import { PRINT_STEP_LABEL } from "@/lib/copy/printSummary";
import type { ChatStepCard } from "@/lib/types/chat";

type TutorStepCardProps = {
  text: string;
  stepCard?: ChatStepCard | null;
};

export function TutorStepCard({ text, stepCard }: TutorStepCardProps) {
  const illustration = stepCard?.illustration_url?.trim() ?? "";
  const altText = stepCard?.alt_text?.trim() || "Picture for this step";
  const caption = stepCard?.caption?.trim() ?? "";

  return (
    <div
      className="rounded-2xl border-2 border-forest bg-white p-6"
      role="region"
      aria-labelledby="tutor-step-heading"
    >
      <p className="text-lg font-semibold text-forest">{PRINT_STEP_LABEL}</p>
      <h3
        id="tutor-step-heading"
        className="mt-2 text-3xl font-semibold leading-tight text-slate-950"
      >
        Your next step
      </h3>
      {illustration ? (
        // SAD step_card illustration when the API sends a URL; alt is required.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={illustration}
          alt={altText}
          className="mt-4 max-h-64 w-full rounded-lg object-contain"
        />
      ) : null}
      <p className="mt-4 text-xl leading-[1.2] text-slate-950">{text}</p>
      {caption ? <p className="mt-3 text-xl text-slate-800">{caption}</p> : null}
    </div>
  );
}