import { createContext } from "react";
import { IContext } from "../models";
//=== for handling it we first create a context to manage sub and unsub of components that needs to be updated
//=== after receiving web socket data, in our case price and count components
const LiveContext = createContext<IContext>({
    sub: () => { },
    unsub: () => { }
});
export default LiveContext;