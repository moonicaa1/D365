import React, { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { KPICard } from "./components/KPICard";
import { RowTwo } from "./components/ActivityRow";
import { RowThree } from "./components/LeadsRow";
import { FloatingActions } from "./components/FloatingActions";
import { KPIDetailModal } from "./components/KPIDetailModal";
import { DealsScreen } from "./components/DealsScreen";
import { ConfigScreen } from "./components/ConfigScreen";
import { KPI } from "./types";

// --- MOCK KPI DATA ---
const INITIAL_KPIS: KPI[] = [
  { id: "1", label: "New Leads", value: "12", trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: "2", label: "Tasks Due", value: "8", trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: "3", label: "Appts", value: "5", trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: "4", label: "Deliveries", value: "3", trend: 0, data: [1, 2, 1, 3, 2, 3, 3] }
];

type ViewState = "dashboard" | "deals" | "config";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("deals");
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpis, setKpis] = useState<KPI[]>(INITIAL_KPIS);

  // --- KPI Auto Refresh ---
  const refreshData = useCallback(() => {
    setTimeout(() => {
      setKpis((prev) =>
        prev.map((kpi) => {
          const currentVal = parseInt(kpi.value);
          const change = Math.floor(Math.random() * 4) - 1;

          const newVal = Math.max(0, currentVal + change);
          let newTrend = kpi.trend;
          if (newVal > currentVal) newTrend += 1;
          if (newVal < currentVal) newTrend -= 1;

          return {
            ...kpi,
            value: newVal.toString(),
            trend: newTrend,
            data: [...kpi.data.slice(1), newVal],
          };
        })
      );
    }, 800);
  }, []);

  useEffect(() => {
    const id = setInterval(refreshData, 30000);
    return () => clearInterval(id);
  }, [refreshData]);

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
      {/* 글로벌 CRM 헤더 (Config view 에서는 숨김) */}
      {currentView !== "config" && (
        <Header currentView={currentView} onNavigate={setCurrentView} />
      )}

      {/* 메인 컨테이너: 절대 포지셔닝 제거 */}
      <main className="flex-1 min-h-0">
        {currentView === "dashboard" && (
          <div className="h-full w-full flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-hidden">
            {/* KPI Row */}
            <div className="shrink-0 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <KPICard
                  key={k.id}
                  kpi={k}
                  onClick={() => setSelectedKPI(k)}
                />
              ))}
            </div>

            {/* 아래 두 개 행 (스크롤 가능 영역) */}
            <div className="flex-1 min-h-0 flex flex-col gap-4">
              <div className="flex-1 min-h-0">
                <RowTwo />
              </div>
              <div className="flex-1 min-h-0">
                <RowThree />
              </div>
            </div>
          </div>
        )}

        {currentView === "deals" && (
          <div className="h-full w-full">
            <DealsScreen />
          </div>
        )}

        {currentView === "config" && (
          <div className="h-full w-full">
            <ConfigScreen onNavigate={setCurrentView} />
          </div>
        )}
      </main>

      {/* 플로팅 액션 (Config 모드에서는 숨김) */}
      {currentView !== "config" && <FloatingActions />}

      {/* KPI 상세 모달 */}
      {selectedKPI && (
        <KPIDetailModal
          kpi={selectedKPI}
          onClose={() => setSelectedKPI(null)}
        />
      )}
    </div>
  );
}
