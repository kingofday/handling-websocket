import useGetLiveData from "../hooks/useGetLiveData";

const Price = ({ id, value }: { id: number, value: number }) => {
    const v = useGetLiveData("price", `price-${id}`, value);
    return <div className='price'>
        {v}
    </div>;
}
export default Price;