import { Dispatch, SetStateAction } from "react";

export type PushType = "count" | "price";
export interface IContext {
    sub: (type: PushType, id: string, updater: Dispatch<SetStateAction<number>>) => void,
    unsub: (type: PushType, id: string) => void
}