type VerifiedGuideBadgeProps = {
  visible: boolean;
};

export function VerifiedGuideBadge({ visible }: VerifiedGuideBadgeProps) {
  if (!visible) return null;

  return (
    <p
      className="inline-flex min-h-11 items-center rounded-xl border border-forest bg-white px-3 py-2 text-lg font-semibold text-forest"
      role="status"
    >
      Verified guide
    </p>
  );
}
