import HeaderBar from "@/components/HeaderBar";
import Races from "@/components/Races";
import Seasons from "@/components/Seasons";

export default function Home() {
  return (
    <div className="bg-[var(--f1-grey)]">
      <HeaderBar />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-8 p-12">
        <h1 className="text-2xl font-bold text-[var(--f1-red)]">
          Explore the seasons, drivers, and teams of Formula One.
        </h1>
        <div className="w-full max-w-6xl">
          <Seasons />
          <Races />
        </div>
      </div>
    </div>
  );
}
