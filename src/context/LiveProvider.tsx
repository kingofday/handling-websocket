import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect } from "react";
import { PushType } from "../models";
import LiveContext from "./LiveContext";

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
                const price = (Math.random() * 100 + 100).toFixed(1);//1000-2000
                const typeSet = subscriers.get("price");
                typeSet?.forEach(updater => {
                    updater(parseFloat(price));
                })
            }, 3000)
        }
        const handleReceiveWebCountSocket = () => {
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
