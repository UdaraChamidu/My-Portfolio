import { useEffect, useState } from "react";
import {
  SiN8N, SiMake, SiPython, SiSupabase, SiModelcontextprotocol, SiLangchain,
  SiClaude, SiGooglegemini, SiLanggraph, SiElevenlabs, SiDeepgram,
  SiGmail, SiGooglesheets, SiPostgresql, SiReact, SiFastapi,
} from "react-icons/si";
import { FaFileExcel, FaSlack } from "react-icons/fa6";
import { TbBrandOpenai, TbBrandTwilio } from "react-icons/tb";

const technologies = [
  ["n8n", SiN8N, "#ea4b71"],
  ["OpenAI", TbBrandOpenai, "#49b99c"],
  ["Make.com", SiMake, "#bd66ee"],
  ["Python", SiPython, "#dfb943"],
  ["Supabase", SiSupabase, "#3ecf8e"],
  ["MCP", SiModelcontextprotocol, "#b4a0ff"],
  ["LangChain", SiLangchain, "#56baa7"],
  ["Twilio", TbBrandTwilio, "#ef526d"],
  ["Claude", SiClaude, "#d99a7c"],
  ["Gemini", SiGooglegemini, "#779bf6"],
  ["LangGraph", SiLanggraph, "#9ab8ed"],
  ["ElevenLabs", SiElevenlabs, "#b4a0ff"],
  ["Deepgram", SiDeepgram, "#13cfa0"],
  ["Gmail", SiGmail, "#ea6c61"],
  ["Google Sheets", SiGooglesheets, "#40b67b"],
  ["Excel", FaFileExcel, "#217346"],
  ["Slack", FaSlack, "#e8a3dd"],
  ["PostgreSQL", SiPostgresql, "#669bc6"],
  ["React", SiReact, "#61dafb"],
  ["FastAPI", SiFastapi, "#27bba6"],
];

const slots = [
  [20, -12, 37, 7], [76, -8, 32, 9], [-6, 20, 31, 8],
  [-12, 66, 35, 10], [20, 105, 29, 8.5], [70, 112, 33, 11],
  [110, 32, 36, 9.5], [104, 79, 28, 7.5],
];

function createDrift(x, y) {
  const length = Math.hypot(x - 50, y - 50);
  const nx = (x - 50) / length;
  const ny = (y - 50) / length;
  const points = {};
  // Drift outward and tangentially so random paths stay clear of the portrait.
  for (let point = 0; point < 4; point++) {
    const outward = 2 + Math.random() * 10;
    const sideways = (Math.random() - 0.5) * 24;
    points[`--drift-x${point}`] = `${nx * outward - ny * sideways}px`;
    points[`--drift-y${point}`] = `${ny * outward + nx * sideways}px`;
  }
  return points;
}

export const HeroTechnologyFloat = () => {
  const [visible, setVisible] = useState(() => slots.map((_, index) => index));
  const [changing, setChanging] = useState(null);
  const [drifts] = useState(() => slots.map(([x, y]) => createDrift(x, y)));

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let inView = false;
    let slot = 0;
    let next = slots.length;
    const displayed = slots.map((_, index) => index);
    const canPlay = () => inView && !document.hidden && !motion.matches;
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (!canPlay()) return;
        setChanging(slot);
        timer = window.setTimeout(() => {
          while (displayed.includes(next)) next = (next + 1) % technologies.length;
          displayed[slot] = next;
          setVisible([...displayed]);
          setChanging(null);
          next = (next + 1) % technologies.length;
          slot = (slot + 1) % slots.length;
          schedule();
        }, 250);
      }, 750);
    };
    const sync = () => {
      window.clearTimeout(timer);
      setChanging(null);
      if (canPlay()) schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(document.getElementById("hero"));
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
  <div className="hero-technology-float" aria-hidden="true">
    {slots.map(([x, y, size, duration], index) => {
      const [name, Icon, color] = technologies[visible[index]];
      return (
      <span
        key={index}
        className="hero-floating-technology"
        data-technology={name}
        style={{
          left: `${x}%`, top: `${y}%`, "--logo-color": color,
          "--logo-size": `${size}px`, "--float-duration": `${duration}s`,
          "--float-delay": `${index * -1.7}s`,
          ...drifts[index],
        }}
      >
        <span className="hero-floating-logo" data-changing={changing === index}>
          <Icon />
        </span>
      </span>
      );
    })}
  </div>
  );
};
