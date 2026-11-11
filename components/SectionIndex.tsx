/**
 * The big outlined section number ("01") behind a section heading. It drifts with --sp
 * (set by ScrollFX on the parent `[data-fx]` section), so it moves slower than the page.
 */
export default function SectionIndex({ n, tone }: { n: string; tone: string }) {
  return (
    <span aria-hidden className={`section-index ${tone}`}>
      {n}
    </span>
  );
}
