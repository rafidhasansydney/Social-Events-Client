import Link from "next/link";
import {
  CalendarCheck,
  CalendarPlus,
  LayoutList,
  UserRound,
} from "lucide-react";

const links = [
  ["profile", "/account", "Profile", UserRound],
  ["create", "/create-event", "Create Event", CalendarPlus],
  ["manage", "/manage-events", "Manage Events", LayoutList],
  ["joined", "/joined-events", "Joined Events", CalendarCheck],
];

export default function MemberNavigation({ current }) {
  return (
    <nav className="member-navigation" aria-label="Your space">
      {links.map(([key, href, label, Icon]) => (
        <Link
          key={key}
          href={href}
          className={key === current ? "selected" : ""}
          aria-current={key === current ? "page" : undefined}
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
