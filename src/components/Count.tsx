import useGetLiveData from "../hooks/useGetLiveData";
//=== count component is like price too but with differnt event type
const Count = ({ id, value }: { id: number, value: number }) => {
    const v = useGetLiveData("count", `count-${id}`, value);
    return <div className='price'>
        {v}
    </div>;
}
export default Count;