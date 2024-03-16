import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect } from "react";
import { PushType } from "../models";
import LiveContext from "./LiveContext";
//=== this is our provider, as you see it has subscribers and handle sub with push type, id of some component
//=== and updater of component for value, you must pass inner state of component to be called with this provider handler for
//=== web socket
const LiveContextPrvider = ({ children }: { children: ReactNode }) => {
    //=== structure of subscriber is like below
    // {
    //     "count|price":["comp1",updater]
    // }
    const subscriers = new Map<PushType, Map<string, Dispatch<SetStateAction<number>>>>();
    const sub = useCallback((type: PushType, id: string, updater: Dispatch<SetStateAction<number>>) => {
        const typeSet = subscriers.get(type);
        if (typeSet)
            typeSet.set(id, updater);
        else subscriers.set(type, new Map([[id, updater]]));
    }, []);
    //=== unsube will clear component from list of subscriber
    const unsub = useCallback((type: PushType, id: string) => {
        const typeSet = subscriers.get(type);
        if (typeSet)
            typeSet.delete(id)
    }, []);
    useEffect(() => {
        //=== handler for receiving data been mocked
        const handleReceivePriceWebSocket = () => {
            //consider this values received from web socket
            setInterval(() => {
                const price = (Math.random() * 100 + 100).toFixed(1);//1000-2000
                const typeSet = subscriers.get("price");
                typeSet?.forEach(updater => {
                    updater(parseFloat(price));
                })
            }, 3000)
        }
        const handleReceiveCountWebSocket = () => {
            //consider this values received from websocket
            setInterval(() => {
                const count = (Math.random() * 100 + 100).toFixed(1);
                const typeSet = subscriers.get("count");
                typeSet?.forEach(updater => {
                    updater(parseFloat(count));
                })
            }, 2500)
        }
        //listen mock
        handleReceivePriceWebSocket();
        handleReceiveCountWebSocket();
        return () => {
            //cleaner
        }
    }, [])
    return <LiveContext.Provider value={{
        sub,
        unsub
    }}>
        {children}
    </LiveContext.Provider>

}
export default LiveContextPrvider;
