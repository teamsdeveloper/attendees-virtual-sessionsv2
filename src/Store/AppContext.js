import React from "react";
import { AppInitialState } from "./AppInitialState";

const AppContext = React.createContext(AppInitialState);

export default AppContext;