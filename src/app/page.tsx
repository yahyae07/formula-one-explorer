import HeaderBar from "@/components/HeaderBar";
import RacesList from "@/components/RacesList";
import Seasons from "@/components/Seasons";

export default function Home() {
  return (
    <div className="bg-[var(--f1-grey)]">
      <HeaderBar />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-2xl font-bold text-[var(--f1-red)]">
          Explore the seasons, drivers, and teams of Formula One.
        </h1>
        <div className="w-full max-w-6xl">
          <Seasons />
          <RacesList />
        </div>
      </div>
    </div>
  );
}
