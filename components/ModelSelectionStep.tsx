import React, { useState, useMemo } from 'react';
import { VehicleModel, Trim } from '../types';
import { Badge } from './ui/Badge';
import { 
    ChevronRight, ArrowRightLeft, CheckSquare, Search, Filter, 
    Car, Users, LogOut, UserCheck, Sparkles, ChevronDown, CheckCircle,
    LayoutGrid, List as ListIcon, ArrowRight
} from 'lucide-react';
import { ComparisonModal } from './ComparisonModal';

// --- DATASET FROM PROMPT ---
const RAW_DATA = {
  "models": [
    {
      "modelId": "bmw_i4",
      "brand": "BMW",
      "name": "BMW i4 eDrive35",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35-1.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35-1.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i4_edrive35_std", "name": "eDrive35 Standard", "price": 52000000 },
        { "trimId": "bmw_i4_edrive35_premium", "name": "eDrive35 Premium", "price": 56000000 }
      ]
    },
    {
      "modelId": "bmw_i5_edrive40",
      "brand": "BMW",
      "name": "BMW i5 eDrive40",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i5_edrive40_std", "name": "eDrive40 Standard", "price": 73000000 },
        { "trimId": "bmw_i5_edrive40_sport", "name": "eDrive40 Sport", "price": 78000000 }
      ]
    },
    {
      "modelId": "bmw_i5_m60",
      "brand": "BMW",
      "name": "BMW i5 M60 xDrive",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i5_m60_base", "name": "M60 Base", "price": 98000000 },
        { "trimId": "bmw_i5_m60_performance", "name": "M60 Performance", "price": 103000000 }
      ]
    },
    {
      "modelId": "bmw_i7_edrive50",
      "brand": "BMW",
      "name": "BMW i7 eDrive50",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-03.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-04.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i7_edrive50_lux", "name": "eDrive50 Luxury", "price": 160000000 },
        { "trimId": "bmw_i7_edrive50_exec", "name": "eDrive50 Executive", "price": 168000000 }
      ]
    },
    {
      "modelId": "bmw_530i",
      "brand": "BMW",
      "name": "BMW 5 Series 530i",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_530i_std", "name": "530i Standard", "price": 72000000 },
        { "trimId": "bmw_530i_msport", "name": "530i M-Sport", "price": 76000000 }
      ]
    },
    {
      "modelId": "porsche_cayenne_s",
      "brand": "Porsche",
      "name": "Porsche Cayenne S",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_s.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_s.png",
        "angles": []
      },
      "trims": [
        { "trimId": "pc_s_base", "name": "Cayenne S Base", "price": 110000000 },
        { "trimId": "pc_s_premium", "name": "Cayenne S Premium", "price": 118000000 }
      ]
    },
    {
      "modelId": "porsche_cayenne_turbo",
      "brand": "Porsche",
      "name": "Porsche Cayenne Turbo",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-03.png"
        ]
      },
      "trims": [
        { "trimId": "pc_turbo_std", "name": "Turbo Standard", "price": 180000000 },
        { "trimId": "pc_turbo_gt", "name": "Turbo GT Package", "price": 195000000 }
      ]
    },
    {
      "modelId": "porsche_turbo_gt",
      "brand": "Porsche",
      "name": "Porsche Cayenne Turbo GT",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne%20Turbo%20GT.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne%20Turbo%20GT.png",
        "angles": []
      },
      "trims": [
        { "trimId": "pc_tgt_base", "name": "Turbo GT Base", "price": 210000000 },
        { "trimId": "pc_tgt_track", "name": "Turbo GT Track Edition", "price": 225000000 }
      ]
    },
    {
      "modelId": "porsche_panamera_base",
      "brand": "Porsche",
      "name": "Porsche Panamera Base",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_base.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_base.png",
        "angles": []
      },
      "trims": [
        { "trimId": "pp_base", "name": "Panamera Base", "price": 120000000 },
        { "trimId": "pp_premium", "name": "Panamera Premium", "price": 132000000 }
      ]
    },
    {
      "modelId": "porsche_911_carrera",
      "brand": "Porsche",
      "name": "Porsche 911 Carrera",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/911%20Carrera.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/911%20Carrera.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p911_carrera_base", "name": "Carrera Base", "price": 150000000 },
        { "trimId": "p911_carrera_sport", "name": "Carrera Sport", "price": 165000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_blue",
      "brand": "Toyota",
      "name": "Toyota Highlander (Blue)",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_blue_std", "name": "Highlander Standard", "price": 45000000 },
        { "trimId": "hl_blue_limited", "name": "Highlander Limited", "price": 49000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_gray",
      "brand": "Toyota",
      "name": "Toyota Highlander (Gray)",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander02.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander02.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_gray_std", "name": "Highlander Standard", "price": 46000000 },
        { "trimId": "hl_gray_limited", "name": "Highlander Limited", "price": 50000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_xse",
      "brand": "Toyota",
      "name": "Toyota Highlander XSE",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander03.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander03.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_xse_std", "name": "Highlander XSE", "price": 52000000 },
        { "trimId": "hl_xse_sport", "name": "Highlander XSE Sport", "price": 55000000 }
      ]
    },
    {
      "modelId": "toyota_grand_highlander",
      "brand": "Toyota",
      "name": "Toyota Grand Highlander",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Grand%20Highlander.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Grand%20Highlander.png",
        "angles": []
      },
      "trims": [
        { "trimId": "gh_std", "name": "Grand Highlander Standard", "price": 58000000 },
        { "trimId": "gh_lux", "name": "Grand Highlander Luxury", "price": 62000000 }
      ]
    },
    {
      "modelId": "toyota_crown_signia",
      "brand": "Toyota",
      "name": "Toyota Crown Signia",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20TOYOTA%20CROWN%20SIGNIA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20TOYOTA%20CROWN%20SIGNIA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "signia_std", "name": "Signia Standard", "price": 51000000 },
        { "trimId": "signia_platinum", "name": "Signia Platinum", "price": 56000000 }
      ]
    },
    {
      "modelId": "hyundai_kona",
      "brand": "Hyundai",
      "name": "Hyundai 2026 KONA",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20KONA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20KONA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "kona_std", "name": "KONA Standard", "price": 28000000 },
        { "trimId": "kona_nline", "name": "KONA N-Line", "price": 32000000 }
      ]
    },
    {
      "modelId": "hyundai_elantra",
      "brand": "Hyundai",
      "name": "Hyundai 2026 ELANTRA",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20ELANTRA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20ELANTRA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "elantra_std", "name": "ELANTRA Standard", "price": 23000000 },
        { "trimId": "elantra_sport", "name": "ELANTRA Sport", "price": 27000000 }
      ]
    },
    {
      "modelId": "hyundai_santafe_hybrid",
      "brand": "Hyundai",
      "name": "Hyundai 2026 SANTA FE Hybrid",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20SANTA%20FE%20Hybrid.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20SANTA%20FE%20Hybrid.png",
        "angles": []
      },
      "trims": [
        { "trimId": "santafe_hyb_std", "name": "SANTA FE Hybrid Standard", "price": 36000000 },
        { "trimId": "santafe_hyb_limited", "name": "SANTA FE Hybrid Limited", "price": 39000000 }
      ]
    },
    {
      "modelId": "hyundai_tucson_hybrid",
      "brand": "Hyundai",
      "name": "Hyundai TUCSON Hybrid",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid003.png"
        ]
      },
      "trims": [
        { "trimId": "tucson_hybrid_std", "name": "TUCSON Hybrid Standard", "price": 31000000 },
        { "trimId": "tucson_hybrid_lux", "name": "TUCSON Hybrid Luxury", "price": 34000000 }
      ]
    }
  ]
};

// --- CONSTANTS ---
const BRANDS = ['All', 'BMW', 'Porsche', 'Toyota', 'Hyundai'];
const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Coupe', 'Sports Car'];
const POWERTRAINS = ['All', 'EV', 'Hybrid', 'Gasoline'];
const BUDGETS = ['All', '< 60M', '60M - 100M', '> 100M'];
const NEO_MINT = '#3FE0C5';

// --- HELPERS ---
const getYearFromModelName = (name: string): string | null => {
    const match = name.match(/\b202[0-9]\b/);
    return match ? match[0] : null;
};

// Map Raw Data to Application Types and inject Filter Props
const MODELS: VehicleModel[] = RAW_DATA.models.map(m => {
    const nameLower = m.name.toLowerCase();
    const isEV = nameLower.includes('i4') || nameLower.includes('i5') || nameLower.includes('i7') || nameLower.includes('electric');
    const isHybrid = nameLower.includes('hybrid');
    const isSUV = nameLower.includes('cayenne') || nameLower.includes('highlander') || nameLower.includes('tucson') || nameLower.includes('santa fe') || nameLower.includes('kona');
    const isCoupe = nameLower.includes('911') || nameLower.includes('coupe');
    const isInventory = Math.random() > 0.5; // Demo inventory status

    const prices = m.trims.map(t => t.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    return {
        id: m.modelId,
        brand: m.brand,
        name: m.name,
        basePrice: minPrice,
        images: m.images,
        imageUrl: m.images.thumbnail, 
        trims: m.trims.length > 0 ? m.trims.map(t => ({
            id: t.trimId,
            name: t.name,
            price: t.price
        })) : [
            { id: `${m.modelId}_base`, name: 'Standard', price: minPrice || 50000000 },
            { id: `${m.modelId}_adv`, name: 'Advanced', price: (minPrice || 50000000) * 1.1 }
        ],
        stockStatus: isInventory ? 'In Stock' : 'Arriving Soon', 
        specs: { hp: 0, mpg: 'N/A', zeroSixty: 'N/A' },
        
        // Injected Filter Props
        bodyType: isSUV ? 'SUV' : isCoupe ? 'Coupe' : 'Sedan',
        powertrain: isEV ? 'EV' : isHybrid ? 'Hybrid' : 'Gasoline',
        isInventory: isInventory
    };
});

interface Props {
    onSelect: (model: VehicleModel, trim: Trim) => void;
    onNavigate: (view: 'dashboard' | 'deals' | 'config') => void;
}

export const ModelSelectionStep: React.FC<Props> = ({ onSelect, onNavigate }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter States
    const [brandFilter, setBrandFilter] = useState('All');
    const [bodyFilter, setBodyFilter] = useState('All');
    const [powerFilter, setPowerFilter] = useState('All');
    const [budgetFilter, setBudgetFilter] = useState('All');
    const [inventoryOnly, setInventoryOnly] = useState(false);

    const filteredModels = useMemo(() => {
        return MODELS.filter(m => {
            if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (brandFilter !== 'All' && m.brand !== brandFilter) return false;
            if (bodyFilter !== 'All' && m.bodyType !== bodyFilter) return false;
            if (powerFilter !== 'All' && m.powertrain !== powerFilter) return false;
            if (inventoryOnly && !m.isInventory) return false;
            if (budgetFilter !== 'All') {
                const price = m.basePrice;
                if (budgetFilter === '< 60M' && price >= 60000000) return false;
                if (budgetFilter === '60M - 100M' && (price < 60000000 || price > 100000000)) return false;
                if (budgetFilter === '> 100M' && price <= 100000000) return false;
            }
            return true;
        });
    }, [searchQuery, brandFilter, bodyFilter, powerFilter, budgetFilter, inventoryOnly]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 font-sans overflow-hidden">
            
            {/* 1. CONFIGU HEADER */}
            <div className="shrink-0 h-[64px] bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 z-30 relative shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <span className="font-black text-white text-sm">D</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-none">Dealer365</span>
                        <span className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider leading-none mt-0.5`}>Configu Mode</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-[${NEO_MINT}]/10 border border-[${NEO_MINT}]/50 text-[${NEO_MINT}] text-xs font-bold hover:bg-[${NEO_MINT}]/20 transition-all`}
                        onClick={() => {}}
                    >
                        <Sparkles size={14} />
                        AI Advisor
                    </button>
                    <div className="h-6 w-px bg-slate-800"></div>
                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Customer Check-in">
                        <UserCheck size={18} />
                    </button>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button onClick={() => onNavigate('dashboard')} className="px-3 py-1 rounded text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors">CRM</button>
                        <button className="px-3 py-1 rounded bg-slate-800 text-white text-[10px] font-bold shadow-sm">Config</button>
                    </div>
                </div>
            </div>

            {/* 2. TITLE & FILTER BAR */}
            <div className="shrink-0 bg-slate-950 border-b border-slate-800 z-20 flex flex-col">
                <div className="px-8 py-6 flex justify-between items-end">
                    <div>
                         <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Select Your Vehicle</h1>
                         <p className="text-sm text-slate-400 font-medium">Showing {filteredModels.length} models available</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative group">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[${NEO_MINT}] transition-colors`} size={16} />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[${NEO_MINT}] w-64 transition-all placeholder:text-slate-600`}
                            />
                        </div>
                        {/* View Toggle */}
                        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <ListIcon size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="px-8 pb-4 flex flex-wrap items-center gap-3">
                     {/* Brand Chips */}
                     <div className="flex items-center gap-2 mr-4 border-r border-slate-800 pr-4">
                        {BRANDS.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setBrandFilter(brand)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                    brandFilter === brand 
                                    ? `bg-[${NEO_MINT}]/10 border-[${NEO_MINT}] text-[${NEO_MINT}]` 
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                }`}
                            >
                                {brand}
                            </button>
                        ))}
                     </div>

                     {/* Dropdowns */}
                     <div className="flex items-center gap-2">
                        <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {BODY_TYPES.map(b => <option key={b} value={b}>{b === 'All' ? 'Body Type' : b}</option>)}
                        </select>
                        <select value={powerFilter} onChange={(e) => setPowerFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {POWERTRAINS.map(p => <option key={p} value={p}>{p === 'All' ? 'Powertrain' : p}</option>)}
                        </select>
                        <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {BUDGETS.map(b => <option key={b} value={b}>{b === 'All' ? 'Budget' : b}</option>)}
                        </select>
                     </div>

                     <div className="flex-1"></div>

                     {/* Inventory Toggle */}
                     <button 
                        onClick={() => setInventoryOnly(!inventoryOnly)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-bold transition-all ${
                            inventoryOnly 
                            ? `bg-[${NEO_MINT}]/20 border-[${NEO_MINT}] text-[${NEO_MINT}]` 
                            : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <CheckCircle size={14} className={inventoryOnly ? `fill-[${NEO_MINT}] text-slate-900` : ""} />
                        In-stock Only
                    </button>
                </div>
            </div>

            {/* 3. CONTENT GRID/LIST */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-950">
                <div className={`grid gap-6 pb-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {filteredModels.map(model => {
                        const year = getYearFromModelName(model.name);
                        const minPrice = formatPrice(model.basePrice);

                        if (viewMode === 'grid') {
                            // GRID CARD UI
                            return (
                                <div key={model.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-600 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                                    {/* Image Section */}
                                    <div 
                                        className="aspect-video relative overflow-hidden cursor-pointer bg-slate-950"
                                        onClick={() => onSelect(model, model.trims[0])}
                                    >
                                        <img 
                                            src={model.imageUrl} 
                                            alt={model.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        
                                        {/* Badges */}
                                        {model.isInventory && (
                                            <div className="absolute top-3 left-3">
                                                <Badge label="In Stock" color="green" variant="solid" className="shadow-lg border border-emerald-400/30 backdrop-blur-md" />
                                            </div>
                                        )}
                                        {year && (
                                            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-white text-[10px] font-bold border border-white/10">
                                                {year}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className={`text-xs font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</h3>
                                            <h2 
                                                className="text-lg font-bold text-white mb-1 leading-tight cursor-pointer hover:underline decoration-slate-600 underline-offset-4"
                                                onClick={() => onSelect(model, model.trims[0])}
                                            >
                                                {model.name}
                                            </h2>
                                            <p className="text-xs text-slate-400">From {minPrice}</p>
                                        </div>

                                        <div className="mt-auto space-y-2">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Available Trims</p>
                                            <div className="space-y-1.5">
                                                {model.trims.slice(0, 3).map(trim => (
                                                    <button
                                                        key={trim.id}
                                                        onClick={() => onSelect(model, trim)}
                                                        className={`w-full flex justify-between items-center p-2.5 rounded-lg bg-slate-800/50 hover:bg-[${NEO_MINT}]/10 border border-transparent hover:border-[${NEO_MINT}]/30 transition-all group/trim text-left`}
                                                    >
                                                        <span className="text-xs font-bold text-slate-300 group-hover/trim:text-white transition-colors">{trim.name}</span>
                                                        <span className="text-[10px] font-medium text-slate-500 group-hover/trim:text-[${NEO_MINT}]">{formatPrice(trim.price)}</span>
                                                    </button>
                                                ))}
                                                {model.trims.length > 3 && (
                                                    <div className="text-center py-1">
                                                        <span className="text-[10px] text-slate-600 font-medium">+{model.trims.length - 3} more trims</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button 
                                                onClick={() => onSelect(model, model.trims[0])}
                                                className={`w-full mt-4 py-3 bg-[${NEO_MINT}] hover:bg-[#32b29d] text-slate-900 text-xs font-extrabold uppercase rounded-lg shadow-lg shadow-[${NEO_MINT}]/10 transition-all flex items-center justify-center gap-2 group/btn`}
                                            >
                                                Configure <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            // LIST CARD UI
                            return (
                                <div key={model.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-all duration-300 flex h-48 group">
                                    {/* Image Left */}
                                    <div 
                                        className="w-72 relative overflow-hidden cursor-pointer bg-slate-950 shrink-0"
                                        onClick={() => onSelect(model, model.trims[0])}
                                    >
                                        <img 
                                            src={model.imageUrl} 
                                            alt={model.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50"></div>
                                        {model.isInventory && (
                                            <div className="absolute top-3 left-3">
                                                <Badge label="In Stock" color="green" variant="solid" className="shadow-sm" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Right */}
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className={`text-xs font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</h3>
                                                <h2 className="text-xl font-bold text-white mb-1">{model.name}</h2>
                                                <p className="text-sm text-slate-400">Starting from <span className="text-white font-bold">{minPrice}</span></p>
                                            </div>
                                            {year && <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded">{year}</span>}
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Trim to Configure</p>
                                            <div className="flex flex-wrap gap-2">
                                                {model.trims.map(trim => (
                                                    <button
                                                        key={trim.id}
                                                        onClick={() => onSelect(model, trim)}
                                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-[${NEO_MINT}] hover:bg-[${NEO_MINT}]/10 transition-all group/trim`}
                                                    >
                                                        <span className="text-xs font-bold text-slate-300 group-hover/trim:text-white">{trim.name}</span>
                                                        <div className="h-3 w-px bg-slate-700 group-hover/trim:bg-[${NEO_MINT}]/30"></div>
                                                        <span className="text-xs font-medium text-slate-500 group-hover/trim:text-[${NEO_MINT}]">{formatPrice(trim.price)}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};