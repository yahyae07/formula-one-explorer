"use client";

import React from "react";
import useViewStore from "@/store/useViewStore";

const HeaderBar = () => {
  const { toggleCardView, showListView, toggleListView } = useViewStore();
  const handleToggleView = () => {
    toggleCardView();
    toggleListView();
  };
  return (
    <div className="relative flex h-16 w-full flex-row items-center justify-between bg-[var(--f1-specialgrey)] shadow-lg px-5">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-[var(--f1-white)] text-4xl font-bold">
          Formula One
        </h1>
        <h1 className="text-[var(--f1-red)] text-4xl font-bold ">Explorer</h1>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <label className="relative block aspect-[2/0.75] w-28 rounded-full bg-gradient-to-br from-[var(--f1-lilac)] via-[var(--f1-red)] shadow-2xl transition-all duration-300 hover:bg-[length:100%_500%] focus:bg-[length:100%_500%] bg-[length:100%_100%] hover:cursor-pointer">
          <input
            className="peer/input hidden"
            type="checkbox"
            checked={showListView}
            onChange={handleToggleView}
          />
          <div className="absolute left-[3%] top-1/2 aspect-square h-[90%] -translate-y-1/2 rotate-180 rounded-full bg-white bg-gradient-to-t transition-all duration-500 peer-checked/input:left-[63%] peer-checked/input:-rotate-6"></div>
          <div
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white ${
              showListView ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            CARDS
          </div>
          <div
            className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white ${
              showListView ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            LIST
          </div>
        </label>
      </div>
    </div>
  );
};

export default HeaderBar;
