import Link from "next/link";
export default function StudioInvitation() {
  return (
    <Link href="/experiments/studio" className="studio-invitation">
      <span className="kicker">
        A detour worth taking / 100 interactive studies
      </span>
      <span className="studio-invitation-title">
        What if we
        <br />
        broke the rules<span>?</span>
      </span>
      <span className="studio-invitation-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="studio-invitation-bottom">
        Physics. Type. Light. Strange little worlds.
        <strong>Enter the studio ↗</strong>
      </span>
    </Link>
  );
}
