"use client";

import { SAVE_PRINT_HINT, SAVE_PRINT_LABEL } from "@/lib/copy/printSummary";

const controlClass =
  "min-h-11 min-w-11 rounded-lg border-2 border-slate-800 bg-white px-6 py-3 text-lg font-semibold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

export function SavePrintControl() {
  return (
    <div className="no-print flex flex-col gap-2 sm:items-end">
      <button type="button" onClick={() => window.print()} className={controlClass}>
        {SAVE_PRINT_LABEL}
      </button>
      <p className="text-base text-slate-800">{SAVE_PRINT_HINT}</p>
    </div>
  );
}
