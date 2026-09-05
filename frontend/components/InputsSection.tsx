import { RunControls } from "@/components/RunControls";
import { isFormLocked } from "@/lib/fsm/runFsm";
import type { RunInput, RunPhase } from "@/lib/types/run";
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
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <h2 id="inputs-heading" className="text-2xl font-semibold text-slate-900">
        Inputs
      </h2>
      <p className="mt-2 text-lg text-slate-800">
        Paste the text, or type what the caller said. Then use Run. Reset clears
        this visit’s check.
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
            className="mt-2 w-full rounded-lg border-2 border-slate-800 bg-white p-3 text-lg text-slate-900 outline-none focus-visible:ring-4 focus-visible:ring-blue-700 disabled:bg-slate-100"
            placeholder="Example: A text says I must pay a fee to keep my account open."
          />
          <p className="mt-2 text-base text-slate-700">
            {input.messageText.trim().length} of {MESSAGE_MAX_LENGTH} characters
          </p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="active-scam-now"
            name="activeScamNow"
            type="checkbox"
            checked={input.activeScamNow}
            disabled={disabled}
            onChange={(event) => onActiveScamNowChange(event.target.checked)}
            className="mt-1 h-11 w-11 shrink-0 border-2 border-slate-800 accent-blue-800"
          />
          <label htmlFor="active-scam-now" className="text-lg text-slate-900">
            I think this is happening right now
          </label>
        </div>

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
