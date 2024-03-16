import { useContext, useEffect, useState } from "react";
import LiveContext from "../context/LiveContext";
import { PushType } from "../models";
const useGetLiveData = (pushType: PushType, id: string, initValue: number) => {
    const [value, updater] = useState<number>(initValue);
    const ctx = useContext(LiveContext);
    useEffect(() => {
        ctx.sub(
            pushType,
            id,
            updater
        );
        return () => {
            ctx.unsub(
                pushType,
                id
            );
        }
    }, [id]);
    return value;
}
export default useGetLiveData;