import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// RaceStatusChartProps interface defines the structure of the props expected by the RaceStatusChart component
interface RaceStatusChartProps {
  season: string;
  round: string;
}

// STATUS_CATEGORIES defines the mapping of status codes to their display labels and colors
const STATUS_CATEGORIES: Record<string, { label: string; color: string }> = {
  FINISHED: { label: "Finished", color: "#00a19c" },
  LAPPED: { label: "Lapped", color: "#c6c6c6" },
  DNQ: { label: "DNQ", color: "#80142b" },
  CAR_ISSUES: { label: "Car Issues", color: "#565f64" },
};

// categorizeStatus function categorizes race status strings into predefined categories
const categorizeStatus = (status: string): string => {
  if (status === "Finished") return "FINISHED";
  if (status.startsWith("+")) return "LAPPED";
  if (status.includes("not qualify")) return "DNQ";
  return "CAR_ISSUES";
};

const RaceStatusChart: React.FC<RaceStatusChartProps> = ({ season, round }) => {
  // Using React hooks to manage state for race status data
  const [statusData, setStatusData] = useState<
    Array<{ name: string; value: number; color: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch race results when the component mounts or season/round changes
  useEffect(() => {
    const fetchRaceResults = async () => {
      if (!season || !round) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://ergast.com/api/f1/${season}/${round}/results.json?limit=50`
        );
        const data = await response.json();
        const results = data.MRData.RaceTable.Races[0]?.Results || [];

        const statusCounts: Record<string, number> = {
          FINISHED: 0,
          LAPPED: 0,
          DNQ: 0,
          CAR_ISSUES: 0,
        };

        results.forEach((result: any) => {
          const category = categorizeStatus(result.status);
          statusCounts[category]++;
        });

        const chartData = Object.keys(statusCounts)
          .filter((category) => statusCounts[category] > 0)
          .map((category) => ({
            name: STATUS_CATEGORIES[category].label,
            value: statusCounts[category],
            color: STATUS_CATEGORIES[category].color,
          }));

        setStatusData(chartData);
      } catch (error) {
        console.error("Error fetching race results:", error);
        setError("Failed to load race results");
      } finally {
        setLoading(false);
      }
    };

    fetchRaceResults();
  }, [season, round]);

  // If loading, display a loading message; if there's an error, display the error message; if no data is available, show a no data message
  if (loading)
    return (
      <div className="flex items-center justify-center bg-[var(--f1-black)] rounded-lg">
        <div className="text-white text-sm animate-pulse">
          Loading race statistics...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center bg-[var(--f1-black)] rounded-lg">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );

  if (statusData.length === 0)
    return (
      <div className="flex items-center justify-center bg-[var(--f1-black)] rounded-lg">
        <div className="text-white text-sm">No completion data available</div>
      </div>
    );

  return (
    // Main container
    <div className="flex-1 flex flex-col">
      <div className="h-36 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* Race status pie chart */}
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={50}
              innerRadius={20}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* Interactive hovering to display participants count within each status */}
            <Tooltip
              formatter={(value) => [value, "Participants"]}
              labelFormatter={() => ""}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid var(--f1-red)",
                borderRadius: "0.5rem",
                color: "white",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend for race status categories */}
      <div className="flex flex-wrap justify-center gap-x-4">
        {statusData.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 mr-1 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[10px] text-white">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceStatusChart;
