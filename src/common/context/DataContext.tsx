import React from "react";
import { IPlayer } from "common/utils/types";

export const DataContext = React.createContext<IPlayer[]>([]);
