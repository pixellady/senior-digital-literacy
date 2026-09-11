import { RunControls } from "@/components/RunControls";
import { isFormLocked } from "@/lib/fsm/runFsm";
import type { RunInput, RunPhase } from "@/lib/types/run";
import { surfaceCard } from "@/lib/ui/surfaces";
import { MESSAGE_MAX_LENGTH } from "@/lib/validation/runInput";

type InputsSectionProps = {
  phase: RunPhase;
  input: RunInput;
  errorMessage: string | null;
  retryable: boolean;
  paused: boolean;
  onMessageTextChange: (value: string) => void;
  onActiveScamNowChange: (value: boolean) => void;
  onReset: () => void;
  onRetry: () => void;
};

export function InputsSection({
  phase,
  input,
  errorMessage,
  retryable,
  paused,
  onMessageTextChange,
  onActiveScamNowChange,
  onReset,
  onRetry,
}: InputsSectionProps) {
  const disabled = isFormLocked(phase);

  return (
    <section
      aria-labelledby="inputs-heading"
      className={surfaceCard}
    >
      <h2
        id="inputs-heading"
        tabIndex={-1}
        className="scroll-mt-36 text-2xl font-semibold text-ink outline-none focus-visible:ring-4 focus-visible:ring-forest"
      >
        Inputs
      </h2>
      <p className="mt-2 text-xl text-slate-800">
        Paste the text, or type what the caller said. Then use Run. Reset starts
        a new check. You can also switch to Learn a skill without Reset.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="message-text"
            className="block text-lg font-medium text-slate-900"
          >
            Message or call to check
          </label>
          <textarea
            id="message-text"
            name="messageText"
            rows={6}
            maxLength={MESSAGE_MAX_LENGTH}
            value={input.messageText}
            disabled={disabled}
            onChange={(event) => onMessageTextChange(event.target.value)}
            className="mt-2 w-full appearance-none rounded-xl border-2 border-forest bg-white p-3 text-xl text-ink shadow-none outline-none ring-0 focus:border-forest focus:outline-none focus:ring-0 focus-visible:border-forest focus-visible:outline-none focus-visible:ring-0 disabled:bg-white"
            placeholder="Example: A text says I must pay a fee to keep my account open."
          />
          <p className="mt-2 text-xl text-slate-700">
            {input.messageText.trim().length} of {MESSAGE_MAX_LENGTH} characters
          </p>
        </div>

        <label
          htmlFor="active-scam-now"
          className={`inline-flex min-h-11 w-fit cursor-pointer items-center gap-3 self-start focus-within:outline focus-within:outline-4 focus-within:outline-offset-2 focus-within:outline-forest ${
            disabled ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          <input
            id="active-scam-now"
            name="activeScamNow"
            type="checkbox"
            checked={input.activeScamNow}
            disabled={disabled}
            onChange={(event) => onActiveScamNowChange(event.target.checked)}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-forest ${
              input.activeScamNow ? "bg-forest text-white" : "bg-white"
            }`}
          >
            {input.activeScamNow ? (
              <span className="text-2xl font-semibold leading-none text-white">✓</span>
            ) : null}
          </span>
          <span className="text-lg font-medium leading-none text-slate-900">
            I think this is happening right now
          </span>
        </label>

        <RunControls
          phase={phase}
          input={input}
          errorMessage={errorMessage}
          retryable={retryable}
          paused={paused}
          onReset={onReset}
          onRetry={onRetry}
        />
      </div>
    </section>
  );
}
