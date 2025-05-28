import HeaderBar from "@/components/HeaderBar";
import Races from "@/components/Races";
import Seasons from "@/components/Seasons";

export default function Home() {
  return (
    <div className="bg-[var(--f1-grey)] flex flex-col min-h-screen">
      <HeaderBar />

      <div className="flex-1 flex flex-col px-12 py-8">
        <h1 className="text-2xl font-bold text-[var(--f1-red)] text-center my-4">
          Explore the seasons, drivers, and teams of Formula One.
        </h1>
        <div className="w-full max-w-6xl mx-auto">
          <Seasons />
          <Races />
        </div>
      </div>
    </div>
  );
}
