"use client";

import { SAVE_PRINT_HINT, SAVE_PRINT_LABEL } from "@/lib/copy/printSummary";
import { btnSecondary } from "@/lib/ui/surfaces";

type SavePrintControlProps = {
  onPrint: () => void;
};

export function SavePrintControl({ onPrint }: SavePrintControlProps) {
  return (
    <div className="no-print flex flex-col items-start gap-2">
      <button type="button" onClick={onPrint} className={btnSecondary}>
        {SAVE_PRINT_LABEL}
      </button>
      <p className="text-left text-xl text-slate-800">{SAVE_PRINT_HINT}</p>
    </div>
  );
}
