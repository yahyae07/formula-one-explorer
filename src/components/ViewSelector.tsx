"use client";

import useViewStore from "@/store/useViewStore";
import React from "react";
import SeasonsCard from "./SeasonsCard";
import SeasonsList from "./SeasonsList";

const ViewSelector = () => {
  const { showCardView, showListView } = useViewStore();
  if (showCardView && !showListView) {
    return <SeasonsCard />;
  } else if (!showCardView && showListView) {
    return <SeasonsList />;
  } else {
    return <SeasonsCard />;
  }
};

export default ViewSelector;
