import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Tutorial from "./Tutorial";
import Onboarding from "./Onboarding";

export default function Intro() {
  return (
    <Routes>
      <Route path="tutorial" element={<Tutorial />} />
      <Route path="onboarding" element={<Onboarding />} />
    </Routes>
  );
}
