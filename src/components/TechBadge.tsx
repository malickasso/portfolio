import { Cloud, HardDrive, Monitor, Network, Radar, Server, Terminal, type LucideIcon } from "lucide-react";
import {
  siBurpsuite,
  siCisco,
  siDjango,
  siExpress,
  siGithubactions,
  siGrafana,
  siMikrotik,
  siNodedotjs,
  siPostgresql,
  siPrometheus,
  siZap,
  siDocker,
  siGit,
  siGitlab,
  siGnubash,
  siJavascript,
  siKalilinux,
  siLaravel,
  siLinux,
  siMetasploit,
  siMysql,
  siOwasp,
  siParrotsecurity,
  siPhp,
  siPython,
  siQemu,
  siReact,
  siWireshark,
  type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  "Burp Suite": siBurpsuite,
  Cisco: siCisco,
  Django: siDjango,
  Express: siExpress,
  "GitHub Actions": siGithubactions,
  Grafana: siGrafana,
  MikroTik: siMikrotik,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Prometheus: siPrometheus,
  "OWASP ZAP": siZap,
  Docker: siDocker,
  Git: siGit,
  GitLab: siGitlab,
  Bash: siGnubash,
  JavaScript: siJavascript,
  "Kali Linux": siKalilinux,
  Laravel: siLaravel,
  Linux: siLinux,
  Metasploit: siMetasploit,
  MySQL: siMysql,
  OWASP: siOwasp,
  "Parrot OS": siParrotsecurity,
  PHP: siPhp,
  Python: siPython,
  KVM: siQemu,
  React: siReact,
  Wireshark: siWireshark,
};

// Outils sans logo officiel disponible
const fallbacks: Record<string, LucideIcon> = {
  Wazuh: Radar,
  Windows: Monitor,
  "Volatility 3": HardDrive,
  tshark: Terminal,
  Nmap: Terminal,
  hashcat: Terminal,
  AWS: Cloud,
  GNS3: Network,
};

// Couleurs trop sombres pour un fond sombre : on suit la couleur du texte.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 70;
}

export default function TechBadge({ name }: { name: string }) {
  const brand = brands[name];
  const Fallback = fallbacks[name] ?? Server;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg">
      {brand ? (
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill={isDark(brand.hex) ? "currentColor" : `#${brand.hex}`}
          aria-hidden
        >
          <path d={brand.path} />
        </svg>
      ) : (
        <Fallback className="h-3.5 w-3.5 text-accent" />
      )}
      {name}
    </span>
  );
}
