import React, { useState } from "react";
import { VehicleModel, Trim, ConfigOption } from "../types";
import {
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Info, Check, Sparkles,
  Layers, Palette, Circle, Package,
  Zap, Shield,
  Car, Armchair, CarFront,
  LogOut, Settings, Gauge, Activity, List,
  BrainCircuit, Save, Send as SendIcon, HelpCircle, UserCheck, X
} from "lucide-react";
import { AccessoryDrawer } from "./AccessoryDrawer";

// --- MOCK OPTIONS DATA ---
const ENGINES: ConfigOption[] = [
  { id: "eng_base", name: "3.0L Turbo V6", price: 0, type: "package", description: "335 hp | 332 lb-ft" },
  { id: "eng_s", name: "2.9L Twin-Turbo V6", price: 8000, type: "package", description: "434 hp | 405 lb-ft" },
  { id: "eng_turbo", name: "4.0L Twin-Turbo V8", price: 24000, type: "package", description: "541 hp | 567 lb-ft" },
];

const TRANSMISSIONS: ConfigOption[] = [
  { id: "trans_auto", name: "8-Speed Tiptronic S", price: 0, type: "package" },
  { id: "trans_pdk", name: "8-Speed PDK", price: 0, type: "package" },
];

const EXTERIOR_PAINTS: ConfigOption[] = [
  { id: "paint_black", name: "Jet Black", price: 0, type: "color", value: "#000000" },
  { id: "paint_white", name: "Carrara White", price: 0, type: "color", value: "#F5F5F5" },
  { id: "paint_grey", name: "Volcano Grey", price: 800, type: "color", value: "#4B5563" },
  { id: "paint_silver", name: "Dolomite Silver", price: 800, type: "color", value: "#D1D5DB" },
  { id: "paint_blue", name: "Gentian Blue", price: 1200, type: "color", value: "#1E3A8A" },
  { id: "paint_red", name: "Carmine Red", price: 3200, type: "color", value: "#B91C1C" },
  { id: "paint_mint", name: "Neo Mint Special", price: 4500, type: "color", value: "#3FE0C5" },
  { id: "paint_crayon", name: "Crayon", price: 3200, type: "color", value: "#9CA3AF" },
];

const WHEELS: ConfigOption[] = [
  { id: "w19", name: '19" Standard Aero', price: 0, type: "wheel" },
  { id: "w20", name: '20" Sport Design', price: 2100, type: "wheel" },
  { id: "w21", name: '21" RS Spyder', price: 3800, type: "wheel" },
  { id: "w21_ex", name: '21" Exclusive Design', price: 4200, type: "wheel" },
];

const INTERIOR_UPHOLSTERY: ConfigOption[] = [
  { id: "uph_black", name: "Black Leather", price: 0, type: "interior", value: "#111827" },
  { id: "uph_beige", name: "Mojave Beige", price: 0, type: "interior", value: "#D2B48C" },
  { id: "uph_red", name: "Bordeaux Red", price: 4200, type: "interior", value: "#7F1D1D" },
  { id: "uph_brown", name: "Truffle Brown", price: 5500, type: "interior", value: "#5D4037" },
];

const INTERIOR_TRIM: ConfigOption[] = [
  { id: "trim_piano", name: "High Gloss Black", price: 0, type: "interior" },
  { id: "trim_carbon", name: "Carbon Fiber", price: 1800, type: "interior" },
  { id: "trim_wood", name: "Dark Walnut", price: 1200, type: "interior" },
];

const PACKAGES_TECH = [
  { id: "tech_hud", name: "Head-Up Display", price: 1500, type: "package", description: "Projects driving info onto windshield." },
  { id: "tech_sound", name: "Burmester 3D Sound", price: 5800, type: "package", description: "High-end 3D Surround Sound System." },
];

const PACKAGES_SAFETY = [
  { id: "safe_lca", name: "Lane Change Assist", price: 900, type: "package", description: "Monitors blind spots." },
  { id: "safe_surround", name: "Surround View", price: 1200, type: "package", description: "360-degree camera system." },
  { id: "safe_innodrive", name: "InnoDrive + ACC", price: 2800, type: "package", description: "Adaptive Cruise Control." },
];

const ACCESSORIES = [
  { id: "acc_roof", name: "Roof Rails Aluminum", price: 400, type: "accessory" },
  { id: "acc_mats", name: "All-Weather Mats", price: 250, type: "accessory" },
  { id: "acc_rack", name: "Bicycle Rack", price: 600, type: "accessory" },
  { id: "acc_cam", name: "Front & Rear Dashcam", price: 380, type: "accessory" },
];

// --- 3D INTERACTION POINTS ---
const POINTS_HIGHLIGHTS = [
  { id: 1, x: 25, y: 45, title: "Matrix LED", desc: "84 pixel elements." },
  { id: 2, x: 62, y: 65, title: '21" Forged', desc: "Lightweight alloy." },
  { id: 3, x: 45, y: 20, title: "Panoramic", desc: "Fixed glass roof." },
];

const POINTS_FEATURES = [
  { id: 10, x: 25, y: 45, title: "Headlights", desc: "Toggle beam animation." },
  { id: 11, x: 50, y: 50, title: "Door", desc: "Open/Close driver door." },
  { id: 12, x: 80, y: 45, title: "Trunk", desc: "Open/Close rear lid." },
  { id: 13, x: 62, y: 65, title: "Wheels", desc: "Rotate wheel view." },
];

// --- UI Sub Components (Accordion / Cards 등) ---
const GhostAccordion: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="bg-slate-900/60 backdrop-blur-md rounded-lg mb-2 border border-slate-800/50 shadow-sm overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full py-3 flex items-center justify-between text-slate-300 hover:text-white transition-colors group px-4"
    >
      <span
        className={`text-xs font-bold tracking-wide uppercase ${
          isOpen ? "text-[#3FE0C5]" : "group-hover:text-white"
        }`}
      >
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={14} className="text-[#3FE0C5]" />
      ) : (
        <ChevronDown size={14} className="text-slate-500 group-hover:text-white" />
      )}
    </button>
    <div
      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="pb-3 pt-0 px-2 space-y-1">{children}</div>
    </div>
  </div>
);

const TextCard: React.FC<{
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
  description?: string;
  hasTooltip?: boolean;
}> = ({ label, price, active, onClick, description, hasTooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative p-3 rounded-[6px] border transition-all cursor-pointer group flex flex-col justify-between min-h-[50px] ${
        active
          ? "border-[#3FE0C5] bg-[#3FE0C5]/10 shadow-[0_0_10px_rgba(63,224,197,0.1)]"
          : "border-slate-800 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800"
      }`}
    >
      <div className="flex justify-between items-start w-full relative">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-bold ${
              active ? "text-[#3FE0C5]" : "text-slate-200"
            }`}
          >
            {label}
          </span>
          {hasTooltip && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(!showTooltip);
                }}
                className="text-slate-500 hover:text-[#3FE0C5] transition-colors"
              >
                <HelpCircle size={12} />
              </button>
              {showTooltip && (
                <div className="absolute left-full ml-2 top-0 w-48 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl z-50">
                  <h5 className="text-xs font-bold text-white mb-1">{label}</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {active && <Check size={12} className="text-[#3FE0C5]" />}
      </div>
      <div className="mt-1 pt-1 border-t border-slate-700/50 flex justify-between items-end">
        <span
          className={`text-[10px] font-semibold ${
            active ? "text-[#3FE0C5]" : "text-slate-500"
          }`}
        >
          {price === 0 ? "Standard" : `+${price.toLocaleString()}`}
        </span>
      </div>
    </div>
  );
};

const SlimColorChip: React.FC<{
  color: string;
  active: boolean;
  onClick: () => void;
  name: string;
}> = ({ color, active, onClick, name }) => (
  <button
    onClick={onClick}
    className={`w-6 h-6 rounded-full transition-all relative group flex-shrink-0 ${
      active
        ? "ring-2 ring-[#3FE0C5] ring-offset-1 ring-offset-slate-900 scale-110"
        : "hover:scale-105 border border-slate-600"
    }`}
    style={{
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent), ${color}`,
    }}
    title={name}
  />
);

const SlimWheelCard: React.FC<{
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
}> = ({ label, price, active, onClick }) => (
  <div
    onClick={onClick}
    className={`relative rounded-[6px] border transition-all cursor-pointer group overflow-hidden ${
      active
        ? "border-[#3FE0C5] shadow-[0_0_10px_rgba(63,224,197,0.15)] bg-[#3FE0C5]/5"
        : "border-slate-800 hover:border-slate-600"
    }`}
  >
    <div className="aspect-square bg-slate-800/50 relative flex items-center justify-center p-2">
      <Circle size={40} strokeWidth={1} className="text-slate-600" />
      {active && (
        <div className="absolute top-1 right-1 bg-[#3FE0C5] rounded-full p-0.5">
          <Check size={8} className="text-black" />
        </div>
      )}
    </div>
    <div className="p-2 bg-slate-900/80 text-center">
      <p
        className={`text-[9px] font-bold leading-tight mb-0.5 line-clamp-1 ${
          active ? "text-[#3FE0C5]" : "text-slate-300"
        }`}
      >
        {label}
      </p>
      <p className="text-[8px] text-slate-500 font-semibold">
        {price === 0 ? "Incl." : `+${price.toLocaleString()}`}
      </p>
    </div>
  </div>
);

const InteriorSwatch: React.FC<{
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
  color: string;
}> = ({ label, active, onClick, color }) => (
  <div
    onClick={onClick}
    className={`relative rounded-md border transition-all cursor-pointer group overflow-hidden aspect-square flex flex-col ${
      active
        ? "border-[#3FE0C5] ring-1 ring-[#3FE0C5]"
        : "border-slate-700 hover:border-slate-500"
    }`}
  >
    <div className="flex-1 w-full" style={{ backgroundColor: color }} />
    <div className="p-1 bg-slate-900 text-center">
      <p className="text-[8px] text-slate-400 truncate">{label}</p>
    </div>
    {active && (
      <div className="absolute top-1 right-1 bg-[#3FE0C5] rounded-full p-0.5 shadow-sm">
        <Check size={8} className="text-black" />
      </div>
    )}
  </div>
);

const AccessoryCard: React.FC<{
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
  onDetail: (e: React.MouseEvent) => void;
}> = ({ label, price, active, onClick, onDetail }) => (
  <div
    onClick={onClick}
    className={`relative rounded-[6px] border transition-all cursor-pointer group overflow-hidden flex flex-col ${
      active
        ? "border-[#3FE0C5] shadow-[0_0_10px_rgba(63,224,197,0.15)]"
        : "border-slate-800 hover:border-slate-600"
    }`}
  >
    <div className="aspect-[4/3] bg-slate-800 relative group-hover:opacity-90 transition-opacity">
      <div className="absolute inset-0 flex items-center justify-center text-slate-600">
        <Package size={24} strokeWidth={1} />
      </div>
      <button
        onClick={onDetail}
        className="absolute top-1 right-1 p-1 bg-black/40 hover:bg-[#3FE0C5] hover:text-black text-white rounded-full backdrop-blur-sm transition-colors z-10"
      >
        <Info size={10} />
      </button>
    </div>
    <div className="p-2 bg-slate-900/80">
      <p
        className={`text-[9px] font-bold leading-tight mb-0.5 line-clamp-1 ${
          active ? "text-[#3FE0C5]" : "text-slate-300"
        }`}
      >
        {label}
      </p>
      <p className="text-[8px] text-slate-500 font-semibold text-right">
        {price === 0 ? "Incl." : `+${price.toLocaleString()}`}
      </p>
    </div>
  </div>
);

const GlowPulsePoint: React.FC<{
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
  label?: string;
}> = ({ x, y, active, onClick, label }) => (
  <div
    className="absolute z-30 group cursor-pointer lg:scale-100 md:scale-90 scale-75"
    style={{ left: `${x}%`, top: `${y}%` }}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full bg-[#A8F1E7] blur-md opacity-20 animate-pulse ${
          active ? "opacity-40 scale-125" : ""
        }`}
      ></div>
      <div className="absolute inset-0 rounded-full border border-[#3FE0C5] opacity-50 animate-[ping_1.6s_ease-out_infinite]" />
      <div
        className={`w-3.5 h-3.5 rounded-full bg-[#3FE0C5] border-2 border-[#29BFA7] shadow-[0_0_10px_#3FE0C5] transition-transform duration-300 group-hover:scale-125 ${
          active ? "scale-125 bg-white" : ""
        }`}
      />
    </div>
    {label && (
      <div className="absolute left-8 top-1 ml-2 px-2 py-1 bg-black/80 backdrop-blur text-[#3FE0C5] text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
        {label}
      </div>
    )}
  </div>
);

const SideRailItem: React.FC<{
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
      active
        ? "bg-[#3FE0C5]/20 text-[#3FE0C5]"
        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
    }`}
    title={label}
  >
    <Icon size={16} />
  </button>
);

// --- 메인 컴포넌트 ---
interface Props {
  model: VehicleModel;
  trim: Trim;
  onBack: () => void;
  onNavigate: (view: "dashboard" | "deals" | "config") => void;
}

export const ConfiguratorStep: React.FC<Props> = ({
  model,
  trim,
  onBack,
  onNavigate,
}) => {
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "1_trim": true,
    "4_exterior": true,
  });

  const [config, setConfig] = useState({
    engine: ENGINES[0],
    transmission: TRANSMISSIONS[0],
    paint: EXTERIOR_PAINTS[0],
    wheels: WHEELS[0],
    uph: INTERIOR_UPHOLSTERY[0],
    trim: INTERIOR_TRIM[0],
    packages: [] as string[],
    accessories: [] as string[],
  });

  const [overlayMode, setOverlayMode] =
    useState<"BASE" | "HIGHLIGHTS" | "FEATURES">("BASE");
  const [view, setView] =
    useState<"Front" | "Side" | "Rear" | "Interior">("Front");
  const [activePointId, setActivePointId] = useState<number | null>(null);
  const [sensorFlash, setSensorFlash] = useState(false);
  const [wheelFocus, setWheelFocus] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [drawerAccessory, setDrawerAccessory] =
    useState<ConfigOption | null>(null);

  const toggleSection = (id: string) => {
    if (panelCollapsed) setPanelCollapsed(false);
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEngineSelect = (e: ConfigOption) => {
    setConfig((prev) => ({ ...prev, engine: e }));
    toggleSection("3_transmission");
  };

  const handleTransmissionSelect = (t: ConfigOption) => {
    setConfig((prev) => ({ ...prev, transmission: t }));
    toggleSection("4_exterior");
  };

  const handleWheelSelect = (w: ConfigOption) => {
    setConfig((prev) => ({ ...prev, wheels: w }));
    setView("Side");
    setWheelFocus(true);
    setTimeout(() => setWheelFocus(false), 800);
  };

  const handleInteriorSelect = (type: "uph" | "trim", val: ConfigOption) => {
    setConfig((prev) => ({ ...prev, [type]: val }));
    setView("Interior");
    setOverlayMode("BASE");
  };

  const toggleMultiSelect = (key: "packages" | "accessories", id: string) => {
    setConfig((prev) => {
      const list = prev[key];
      const exists = list.includes(id);
      if (!exists && key === "packages") {
        setSensorFlash(true);
        setTimeout(() => setSensorFlash(false), 600);
      }
      return {
        ...prev,
        [key]: exists ? list.filter((x) => x !== id) : [...list, id],
      };
    });
  };

  const handleViewChange = (
    newView: "Front" | "Side" | "Rear" | "Interior"
  ) => {
    setView(newView);
    setOverlayMode("BASE");
    setActivePointId(null);
  };

  const handleAccessoryDetail = (e: React.MouseEvent, acc: ConfigOption) => {
    e.stopPropagation();
    setDrawerAccessory(acc);
  };

  // 가격 계산
  const calculateTotal = () => {
    let total = trim.price;
    total +=
      config.engine.price +
      config.transmission.price +
      config.paint.price +
      config.wheels.price +
      config.uph.price +
      config.trim.price;
    const allPackages = [...PACKAGES_TECH, ...PACKAGES_SAFETY];
    config.packages.forEach((pid) => {
      const p = allPackages.find((x) => x.id === pid);
      if (p) total += p.price;
    });
    config.accessories.forEach((aid) => {
      const a = ACCESSORIES.find((x) => x.id === aid);
      if (a) total += a.price;
    });
    return total;
  };

  const totalPrice = calculateTotal();
  const optionsTotal = totalPrice - trim.price;
  const accTotal = config.accessories.reduce((acc, curr) => {
    const item = ACCESSORIES.find((a) => a.id === curr);
    return acc + (item?.price || 0);
  }, 0);

  const carImageSrc =
    model.imageUrl ||
    (model as any).images?.hero ||
    (model as any).images?.thumbnail ||
    "";

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-[#3FE0C5] selection:text-slate-900">
      {/* 상단 헤더 */}
      <header className="h-[64px] bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
            <span className="font-black text-white text-sm">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none">
              Dealer365
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold text-[#3FE0C5] uppercase tracking-wider leading-none">
                Configurator
              </span>
              <div className="h-2 w-px bg-slate-700" />
              <span className="text-[10px] text-slate-400">
                {model.name} • {trim.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
          >
            <ChevronLeft size={14} />
            Change Model
          </button>

          <div className="h-6 w-px bg-slate-800" />

          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Customer Check-in"
          >
            <UserCheck size={18} />
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#3FE0C5] transition-colors"
          >
            <LogOut size={16} />{" "}
            <span className="hidden sm:inline">Switch to CRM</span>
          </button>
        </div>
      </header>

      {/* 헤더 아래 영역: 3D + 옵션 패널 */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* 3D VIEW 영역 */}
        <div className="order-1 lg:order-2 flex-1 min-h-[260px] relative bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
          <div
            className={`relative w-full h-full max-w-[1400px] transition-transform duration-[800ms] ease-out ${
              wheelFocus ? "scale-110 translate-y-10" : "scale-100"
            }`}
          >
            {carImageSrc ? (
              <img
                src={carImageSrc}
                alt="3D View"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  view === "Interior" ? "scale-110" : "scale-100"
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Car
                  size={80}
                  className="text-slate-800 opacity-20 lg:w-32 lg:h-32"
                />
              </div>
            )}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none transition-colors duration-[250ms]"
              style={{ backgroundColor: config.paint.value }}
            />
            <div
              className={`absolute inset-0 pointer-events-none border-4 border-[#3FE0C5] shadow-[inset_0_0_50px_#3FE0C5] transition-opacity duration-500 ${
                sensorFlash ? "opacity-40" : "opacity-0"
              }`}
            />
          </div>

          {/* AI 인사이트 토글 */}
          <button
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className={`absolute top-4 left-4 lg:top-6 lg:left-6 z-50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/10 ${
              aiPanelOpen
                ? "bg-[#3FE0C5] text-slate-900"
                : "bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <BrainCircuit size={20} strokeWidth={2} />
          </button>

          {/* AI 인사이트 패널 */}
          <div
            className={`absolute top-16 left-4 lg:top-20 lg:left-6 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 transition-all duration-300 origin-top-left overflow-hidden ${
              aiPanelOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#3FE0C5]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Insights
                </h3>
              </div>
              <button onClick={() => setAiPanelOpen(false)}>
                <X size={16} className="text-slate-500 hover:text-white" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Engagement Score
                  </span>
                  <span className="text-xl font-black text-[#3FE0C5] leading-none">
                    85
                    <span className="text-xs font-medium text-slate-500 ml-0.5">
                      /100
                    </span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3FE0C5] w-[85%] shadow-[0_0_10px_#3FE0C5]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Purchase Probability
                  </span>
                  <span className="text-sm font-bold text-white">High</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-[#3FE0C5] w-[72%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Highlights / Features 토글 */}
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex flex-col lg:flex-row gap-2 z-40">
            <button
              onClick={() => {
                if (overlayMode === "HIGHLIGHTS") setOverlayMode("BASE");
                else setOverlayMode("HIGHLIGHTS");
                setActivePointId(null);
              }}
              disabled={view === "Interior"}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg lg:rounded-l-full lg:rounded-r-none backdrop-blur-md border transition-all flex items-center gap-2 text-[10px] lg:text-xs font-bold ${
                overlayMode === "HIGHLIGHTS"
                  ? "bg-slate-900/90 border-[#3FE0C5] text-[#3FE0C5]"
                  : "bg-slate-900/40 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Info size={14} strokeWidth={2} />
              Highlights
            </button>
            <button
              onClick={() => {
                if (overlayMode === "FEATURES") setOverlayMode("BASE");
                else setOverlayMode("FEATURES");
                setActivePointId(null);
              }}
              disabled={view === "Interior"}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg lg:rounded-r-full lg:rounded-l-none backdrop-blur-md border transition-all flex items-center gap-2 text-[10px] lg:text-xs font-bold ${
                overlayMode === "FEATURES"
                  ? "bg-slate-900/90 border-[#3FE0C5] text-[#3FE0C5]"
                  : "bg-slate-900/40 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles size={14} strokeWidth={2} />
              Features
            </button>
          </div>

          {/* Glow 포인트 */}
          {(overlayMode === "HIGHLIGHTS"
            ? POINTS_HIGHLIGHTS
            : overlayMode === "FEATURES"
            ? POINTS_FEATURES
            : []
          ).map((p) => (
            <GlowPulsePoint
              key={p.id}
              x={p.x}
              y={p.y}
              active={activePointId === p.id}
              onClick={() =>
                setActivePointId(activePointId === p.id ? null : p.id)
              }
              label={p.title}
            />
          ))}

          {/* 하단 뷰 네비게이션 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-max max-w-[90%]">
            <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 h-[44px] lg:h-[52px]">
              {[
                { id: "Front", icon: CarFront },
                { id: "Side", icon: Car },
                { id: "Rear", icon: Car },
                { id: "Interior", icon: Armchair },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() =>
                    handleViewChange(v.id as "Front" | "Side" | "Rear" | "Interior")
                  }
                  className={`h-full px-3 lg:px-5 rounded-lg text-[10px] lg:text-xs font-bold transition-all flex items-center gap-1.5 ${
                    view === v.id
                      ? "bg-[#3FE0C5] text-slate-900"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <v.icon size={16} />
                  <span className="hidden sm:inline">{v.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 옵션 패널 */}
        <div
          className={`relative order-2 lg:order-1 bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl transition-all duration-300 ${
            panelCollapsed ? "w-[56px] h-[360px] lg:h-full" : "w-full h-[360px] lg:w-[280px] lg:h-full"
          }`}
        >
          {/* 접기 핸들 (lg 이상에서만) */}
          <button
            onClick={() => setPanelCollapsed(!panelCollapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-slate-800 border border-slate-700 rounded-r-md hidden lg:flex items-center justify-center text-slate-400 hover:text-white z-50 shadow-md"
          >
            {panelCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* 내용 스크롤 영역 */}
          <div
            className={`flex-1 min-h-0 overflow-y-auto no-scrollbar ${
              panelCollapsed ? "px-0 py-2" : "p-4 pb-40"
            } space-y-1`}
          >
            {panelCollapsed ? (
              <div className="flex flex-col items-center gap-2 w-full pt-2">
                <SideRailItem
                  icon={List}
                  label="Trim"
                  active={openSections["1_trim"]}
                  onClick={() => toggleSection("1_trim")}
                />
                <SideRailItem
                  icon={Settings}
                  label="Powertrain"
                  active={openSections["2_engine"]}
                  onClick={() => toggleSection("2_engine")}
                />
                <SideRailItem
                  icon={Activity}
                  label="Transmission"
                  active={openSections["3_transmission"]}
                  onClick={() => toggleSection("3_transmission")}
                />
                <SideRailItem
                  icon={Palette}
                  label="Exterior"
                  active={openSections["4_exterior"]}
                  onClick={() => toggleSection("4_exterior")}
                />
                <SideRailItem
                  icon={Layers}
                  label="Interior"
                  active={openSections["5_interior"]}
                  onClick={() => toggleSection("5_interior")}
                />
                <SideRailItem
                  icon={Zap}
                  label="Tech"
                  active={openSections["6_technology"]}
                  onClick={() => toggleSection("6_technology")}
                />
                <SideRailItem
                  icon={Shield}
                  label="Safety"
                  active={openSections["7_safety"]}
                  onClick={() => toggleSection("7_safety")}
                />
                <SideRailItem
                  icon={Package}
                  label="Accessories"
                  active={openSections["9_accessories"]}
                  onClick={() => toggleSection("9_accessories")}
                />
              </div>
            ) : (
              <>
                <GhostAccordion
                  title="1. Trim"
                  isOpen={openSections["1_trim"]}
                  onToggle={() => toggleSection("1_trim")}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {model.trims.map((t) => (
                      <TextCard
                        key={t.id}
                        label={t.name}
                        price={t.price - model.trims[0].price}
                        active={trim.id === t.id}
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                </GhostAccordion>

                <GhostAccordion
                  title="2. Powertrain"
                  isOpen={openSections["2_engine"]}
                  onToggle={() => toggleSection("2_engine")}
                >
                  {ENGINES.map((e) => (
                    <TextCard
                      key={e.id}
                      label={e.name}
                      price={e.price}
                      active={config.engine.id === e.id}
                      onClick={() => handleEngineSelect(e)}
                    />
                  ))}
                </GhostAccordion>

                <GhostAccordion
                  title="3. Transmission"
                  isOpen={openSections["3_transmission"]}
                  onToggle={() => toggleSection("3_transmission")}
                >
                  {TRANSMISSIONS.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleTransmissionSelect(t)}
                      className={`flex items-center gap-3 p-3 rounded-[6px] cursor-pointer ${
                        config.transmission.id === t.id
                          ? "bg-[#3FE0C5]/10"
                          : "hover:bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border ${
                          config.transmission.id === t.id
                            ? "border-[#3FE0C5]"
                            : "border-slate-500"
                        }`}
                      >
                        {config.transmission.id === t.id && (
                          <div className="w-2 h-2 rounded-full bg-[#3FE0C5] m-0.5" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-300">
                        {t.name}
                      </span>
                    </div>
                  ))}
                </GhostAccordion>

                <GhostAccordion
                  title="4. Exterior"
                  isOpen={openSections["4_exterior"]}
                  onToggle={() => toggleSection("4_exterior")}
                >
                  <div className="mb-4">
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Paint
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {EXTERIOR_PAINTS.map((p) => (
                        <SlimColorChip
                          key={p.id}
                          color={p.value!}
                          active={config.paint.id === p.id}
                          onClick={() =>
                            setConfig((prev) => ({ ...prev, paint: p }))
                          }
                          name={p.name}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#3FE0C5] mt-2 font-medium">
                      {config.paint.name}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Wheels
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {WHEELS.map((w) => (
                        <SlimWheelCard
                          key={w.id}
                          label={w.name}
                          price={w.price}
                          active={config.wheels.id === w.id}
                          onClick={() => handleWheelSelect(w)}
                        />
                      ))}
                    </div>
                  </div>
                </GhostAccordion>

                <GhostAccordion
                  title="5. Interior"
                  isOpen={openSections["5_interior"]}
                  onToggle={() => toggleSection("5_interior")}
                >
                  <div className="mb-4">
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Upholstery
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {INTERIOR_UPHOLSTERY.map((u) => (
                        <InteriorSwatch
                          key={u.id}
                          label={u.name}
                          price={u.price}
                          active={config.uph.id === u.id}
                          onClick={() => handleInteriorSelect("uph", u)}
                          color={u.value!}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                      Trim
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {INTERIOR_TRIM.map((t) => (
                        <InteriorSwatch
                          key={t.id}
                          label={t.name}
                          price={t.price}
                          active={config.trim.id === t.id}
                          onClick={() => handleInteriorSelect("trim", t)}
                          color="#333"
                        />
                      ))}
                    </div>
                  </div>
                </GhostAccordion>

                <GhostAccordion
                  title="6. Technology"
                  isOpen={openSections["6_technology"]}
                  onToggle={() => toggleSection("6_technology")}
                >
                  <div className="space-y-2">
                    {PACKAGES_TECH.map((p) => (
                      <TextCard
                        key={p.id}
                        label={p.name}
                        price={p.price}
                        active={config.packages.includes(p.id)}
                        onClick={() => toggleMultiSelect("packages", p.id)}
                        description={p.description}
                        hasTooltip
                      />
                    ))}
                  </div>
                </GhostAccordion>

                <GhostAccordion
                  title="7. Safety"
                  isOpen={openSections["7_safety"]}
                  onToggle={() => toggleSection("7_safety")}
                >
                  <div className="space-y-2">
                    {PACKAGES_SAFETY.map((p) => (
                      <TextCard
                        key={p.id}
                        label={p.name}
                        price={p.price}
                        active={config.packages.includes(p.id)}
                        onClick={() => toggleMultiSelect("packages", p.id)}
                        description={p.description}
                        hasTooltip
                      />
                    ))}
                  </div>
                </GhostAccordion>

                <GhostAccordion
                  title="8. Accessories"
                  isOpen={openSections["9_accessories"]}
                  onToggle={() => toggleSection("9_accessories")}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {ACCESSORIES.map((a) => (
                      <AccessoryCard
                        key={a.id}
                        label={a.name}
                        price={a.price}
                        active={config.accessories.includes(a.id)}
                        onClick={() => toggleMultiSelect("accessories", a.id)}
                        onDetail={(e) => handleAccessoryDetail(e, a)}
                      />
                    ))}
                  </div>
                </GhostAccordion>
              </>
            )}
          </div>

          {/* 하단 요약 */}
          {!panelCollapsed && (
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Base</span>
                  <span>${trim.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Options</span>
                  <span className="text-[#3FE0C5]">
                    +${optionsTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Acc.</span>
                  <span className="text-[#3FE0C5]">
                    +${accTotal.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-slate-800 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-lg font-black text-white leading-none">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="w-full py-3 bg-[#3FE0C5] text-slate-900 text-xs font-extrabold uppercase rounded-[6px] hover:bg-[#32b29d] shadow-[0_0_20px_rgba(63,224,197,0.2)] transition-all active:scale-[0.98]">
                  Create Quotation
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase rounded-[6px] hover:border-[#3FE0C5] hover:text-[#3FE0C5] flex items-center justify-center gap-1 transition-all">
                    <Save size={14} /> Save
                  </button>
                  <button className="flex-1 py-2 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase rounded-[6px] hover:border-[#3FE0C5] hover:text-[#3FE0C5] flex items-center justify-center gap-1 transition-all">
                    <SendIcon size={14} /> Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accessory Drawer */}
      <AccessoryDrawer
        accessory={drawerAccessory}
        isOpen={!!drawerAccessory}
        onClose={() => setDrawerAccessory(null)}
        onToggle={(id) => toggleMultiSelect("accessories", id)}
        isSelected={
          drawerAccessory
            ? config.accessories.includes(drawerAccessory.id)
            : false
        }
      />
    </div>
  );
};
