import type { CaseVisual as Kind } from "@/content/types";

/** Visuels abstraits : aucune donnée client n'est montrée. */
export default function CaseVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <div className={`grid-bg relative flex items-center justify-center overflow-hidden bg-surface-2 ${className}`}>
      <svg viewBox="0 0 320 200" className="h-full w-full transition-transform duration-700 group-hover:scale-105" aria-hidden>
        {kind === "network" && <Network />}
        {kind === "radar" && <Radar />}
        {kind === "flag" && <Flag />}
        {kind === "terminal" && <Terminal />}
        {kind === "memory" && <Memory />}
        {kind === "headers" && <Headers />}
        {kind === "bucket" && <Bucket />}
        {kind === "vms" && <Vms />}
      </svg>
    </div>
  );
}

const stroke = { stroke: "var(--accent)", fill: "none", strokeWidth: 1.2 };
const dim = { stroke: "var(--muted)", fill: "none", strokeWidth: 1, opacity: 0.5 };

function Network() {
  const nodes = [
    [160, 100, "SIEM"],
    [70, 55, "ATK"],
    [250, 55, "WIN"],
    [70, 150, "LNX"],
    [250, 150, "MSF"],
  ] as const;
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="9">
      {nodes.slice(1).map(([x, y]) => (
        <line key={`${x}${y}`} x1={160} y1={100} x2={x} y2={y} {...dim} strokeDasharray="3 4" />
      ))}
      {nodes.map(([x, y, l], i) => (
        <g key={l}>
          <rect x={x - 24} y={y - 14} width="48" height="28" rx="6" {...(i === 0 ? stroke : dim)} fill="var(--bg)" />
          <text x={x} y={y + 3} textAnchor="middle" fill={i === 0 ? "var(--accent)" : "var(--muted)"}>
            {l}
          </text>
        </g>
      ))}
      <circle r="3" fill="var(--accent)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M70,55 L160,100 L250,150" />
      </circle>
    </g>
  );
}

function Radar() {
  return (
    <g>
      {[30, 55, 80].map((r) => (
        <circle key={r} cx="160" cy="100" r={r} {...dim} />
      ))}
      <line x1="80" y1="100" x2="240" y2="100" {...dim} />
      <line x1="160" y1="20" x2="160" y2="180" {...dim} />
      <path d="M160 100 L160 20 A80 80 0 0 1 229 60 Z" fill="var(--accent)" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" from="0 160 100" to="360 160 100" dur="5s" repeatCount="indefinite" />
      </path>
      <circle cx="200" cy="70" r="4" fill="#ff5a5a" />
      <circle cx="125" cy="135" r="3" fill="var(--accent)" />
      <circle cx="185" cy="140" r="3" fill="var(--muted)" />
    </g>
  );
}

function Flag() {
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="10">
      <line x1="120" y1="40" x2="120" y2="165" {...stroke} strokeWidth="2" />
      <path d="M120 45 L210 45 L190 70 L210 95 L120 95 Z" {...stroke} fill="var(--accent)" fillOpacity="0.2" />
      <text x="135" y="75" fill="var(--accent)">mk_07</text>
      <text x="160" y="185" textAnchor="middle" fill="var(--muted)">{"flag{f0r3ns1c}"}</text>
    </g>
  );
}

function Terminal() {
  const lines = ["$ file chall.bin", "ELF 64-bit LSB", "$ strings -n 8 chall.bin", "> decoding payload…", "$ ./exploit.py", "[+] flag captured"];
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="10">
      <rect x="40" y="25" width="240" height="150" rx="8" {...dim} fill="var(--bg)" />
      {["#ff5a5a", "#ffb547", "var(--accent)"].map((c, i) => (
        <circle key={c} cx={56 + i * 12} cy="40" r="3.5" fill={c} />
      ))}
      {lines.map((l, i) => (
        <text key={l} x="54" y={68 + i * 17} fill={i === lines.length - 1 ? "var(--accent)" : "var(--muted)"}>
          {l}
        </text>
      ))}
    </g>
  );
}

function Memory() {
  const rows = [
    ["PID", "PPID", "ImageFileName"],
    ["4", "0", "System"],
    ["612", "4", "smss.exe"],
    ["812", "612", "services.exe"],
    ["1337", "812", "svch0st.exe"],
    ["2044", "812", "lsass.exe"],
  ];
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="10">
      <text x="40" y="36" fill="var(--accent)">$ vol -f mem.raw windows.pslist</text>
      {rows.map((r, i) => {
        const bad = r[2] === "svch0st.exe";
        const y = 62 + i * 21;
        return (
          <g key={r[0]}>
            {bad && <rect x="34" y={y - 13} width="252" height="18" rx="3" fill="#ff5a5a" fillOpacity="0.15" stroke="#ff5a5a" strokeOpacity="0.6" />}
            <text x="40" y={y} fill={i === 0 ? "var(--fg)" : bad ? "#ff5a5a" : "var(--muted)"}>{r[0]}</text>
            <text x="100" y={y} fill={i === 0 ? "var(--fg)" : bad ? "#ff5a5a" : "var(--muted)"}>{r[1]}</text>
            <text x="160" y={y} fill={i === 0 ? "var(--fg)" : bad ? "#ff5a5a" : "var(--muted)"}>{r[2]}</text>
          </g>
        );
      })}
    </g>
  );
}

function Headers() {
  const rows: [string, boolean][] = [
    ["Content-Security-Policy", true],
    ["Strict-Transport-Security", true],
    ["Access-Control-Allow-Origin: *", false],
    ["X-Content-Type-Options", true],
    ["Subresource-Integrity", false],
  ];
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="10">
      <text x="40" y="36" fill="var(--accent)">$ zap-baseline.py -t https://api</text>
      {rows.map(([h, ok], i) => (
        <g key={h}>
          <text x="40" y={64 + i * 22} fill={ok ? "var(--accent)" : "#ff5a5a"}>{ok ? "[PASS]" : "[WARN]"}</text>
          <text x="92" y={64 + i * 22} fill="var(--muted)">{h}</text>
        </g>
      ))}
    </g>
  );
}

function Bucket() {
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="10">
      <ellipse cx="160" cy="58" rx="56" ry="14" {...stroke} />
      <path d="M104 58 L114 140 A46 12 0 0 0 206 140 L216 58" {...stroke} />
      <text x="160" y="104" textAnchor="middle" fill="var(--accent)">s3://bucket</text>
      <rect x="92" y="160" width="136" height="20" rx="4" fill="#ff5a5a" fillOpacity="0.15" stroke="#ff5a5a" strokeOpacity="0.6" />
      <text x="160" y="174" textAnchor="middle" fill="#ff5a5a">ACL: public-read</text>
    </g>
  );
}

function Vms() {
  const vms = ["LDAP", "MAIL", "WEB", "MONITOR"];
  return (
    <g fontFamily="var(--font-jetbrains)" fontSize="9">
      <line x1="40" y1="100" x2="280" y2="100" {...dim} />
      {vms.map((v, i) => {
        const x = 52 + i * 60;
        return (
          <g key={v}>
            <line x1={x + 24} y1="100" x2={x + 24} y2={i % 2 ? 122 : 78} {...dim} />
            <rect x={x} y={i % 2 ? 122 : 40} width="48" height="38" rx="5" {...(i === 3 ? stroke : dim)} fill="var(--bg)" />
            <text x={x + 24} y={i % 2 ? 145 : 63} textAnchor="middle" fill={i === 3 ? "var(--accent)" : "var(--muted)"}>{v}</text>
          </g>
        );
      })}
      <text x="160" y="185" textAnchor="middle" fill="var(--muted)">ifri.com</text>
    </g>
  );
}
