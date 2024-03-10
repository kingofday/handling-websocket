import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect } from "react";
import LiveContext from "./liveContext";
import { PushType } from "../models";

const LiveContextPrvider = ({ children }: { children: ReactNode }) => {
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
    const unsub = useCallback((type: PushType, id: string) => {
        const typeSet = subscriers.get(type);
        if (typeSet)
            typeSet.delete(id)
    }, []);
    useEffect(() => {
        const handleReceiveWebPriceSocket = () => {
            //consider this values received from websocket
            setInterval(() => {
                const price = Math.random() * 1000 + 1000;
                const typeSet = subscriers.get("price");
                typeSet?.forEach(updater => {
                    updater(price);
                })
            }, 3000)
        }
        const handleReceiveWebCountSocket = () => {
            //consider this values received from websocket
            setInterval(() => {
                const count = Math.random() * 100 + 100;
                const typeSet = subscriers.get("count");
                typeSet?.forEach(updater => {
                    updater(count);
                })
            }, 3000)
        }
        //listen mock
        handleReceiveWebPriceSocket();
        handleReceiveWebCountSocket();
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
