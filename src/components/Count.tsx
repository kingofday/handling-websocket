import { useState } from "react";
import useGetLiveData from "../hooks/useGetLiveData";

const Count = ({ id, value }: { id: number, value: number }) => {
    const v = useGetLiveData("count", `count-${id}`, value);
    return <div className='price'>
        {v}
    </div>;
}
export default Count;