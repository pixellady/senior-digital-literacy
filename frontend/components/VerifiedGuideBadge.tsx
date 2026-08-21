type VerifiedGuideBadgeProps = {
  visible: boolean;
};

export function VerifiedGuideBadge({ visible }: VerifiedGuideBadgeProps) {
  if (!visible) return null;

  return (
    <p
      className="inline-flex min-h-11 items-center rounded-lg border-2 border-slate-800 bg-stone-50 px-3 py-2 text-lg font-semibold text-slate-900"
      role="status"
    >
      Verified guide
    </p>
  );
}
