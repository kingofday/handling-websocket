import { useEffect, useState } from 'react';
import LiveContextPrvider from './context/LiveProvider';
import Price from './components/Price';
import Count from './components/Count';

function App() {
  //=== this is array of data that holds table data and can be fetched from api call
  const [data, setData] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 1000,//will be updated
      count: 30//will be updated
    },
    {
      id: 2,
      name: "Item 2",
      price: 1500,
      count: 20
    },
    {
      id: 3,
      name: "Item 3",
      price: 1900,
      count: 24
    },
    {
      id: 4,
      name: "Item 4",
      price: 2200,
      count: 23
    }
  ]);
  useEffect(() => {
    //=== this can be some handler for web socket data
    //=== as you see every time it receive data
    //=== state will be updated and because of that whole table will be rerendered instead of required cells,
    //=== so its not a good approach
    const handleWebSocketData = (data: any) => {
      setData(s => [...s.map(d => ({
        ...d,
        count: data.id === d.id ? data.count : d.count,
        price: data.id === d.id ? data.price : d.price,
      }))]);
    }
    //===remaining of code for defining listener
    //...
    return () => {
      //===cleaner function
    }
  }, [])
  //=== in our jsx we have a table thta needs to be updated
  //=== now we wrap the app compoennt with our context as below
  return (
    <LiveContextPrvider>
      <main>
        <h1>Web socket pure react best practice</h1>
        <div className='tbl-wrapper'>
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>name</td>
                <td>price</td>
                <td>count</td>
              </tr>
            </thead>
            <tbody>
              {data.map((d: any, idx: number) => <tr key={d.id}>
                <td>{idx + 1}</td>
                <td>{d.name}</td>
                <td><Price id={d.id} value={d.price}/></td>
                <td><Count id={d.id} value={d.count}/></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </main>
    </LiveContextPrvider>
  )
}

export default App
