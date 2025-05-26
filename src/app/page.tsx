import HeaderBar from "@/components/HeaderBar";
import RacesList from "@/components/RacesList";
import SeasonsCard from "@/components/SeasonsCard";
import SeasonsList from "@/components/SeasonsList";

export default function Home() {
  return (
    <div className="bg-[#1E2028]">
      <HeaderBar />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-2xl font-bold text-white">
          Explore the seasons, drivers, and teams of Formula One.
        </h1>
        <div className="w-full max-w-6xl">
          {/* <SeasonsCard /> */}
          <SeasonsList />
          <RacesList />
        </div>
      </div>
    </div>
  );
}
