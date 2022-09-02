import React from "react";
import { INavigationMapInst } from "./NavigationMap";

export const NavigationContext = React.createContext<
  INavigationMapInst | undefined
>(undefined);
