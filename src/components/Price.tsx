import useGetLiveData from "../hooks/useGetLiveData";
//=== this is price component for handling price ui and refister on websocket by custom hook
const Price = ({ id, value }: { id: number, value: number }) => {
    const v = useGetLiveData("price", `price-${id}`, value);
    return <div className='price'>
        {v}
    </div>;
}
export default Price;