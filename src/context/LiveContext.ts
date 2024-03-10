import { createContext } from "react";
import { IContext } from "../models";

const LiveContext = createContext<IContext>({
    sub: () => { },
    unsub: () => { }
});
export default LiveContext;