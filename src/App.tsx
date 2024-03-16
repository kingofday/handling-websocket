import { useEffect, useState } from 'react';
import LiveContextPrvider from './context/LiveProvider';
import Price from './components/Price';
import Count from './components/Count';

function App() {
  //for simplicity didn't include api call for data
  const [data, setData] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 1000,
      count: 30
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
    //=== mocking receive push
    const handleWebSocketData = (data: any) => {
      setData(s => [...s.map(d => ({
        ...d,
        count: data.id === d.id ? data.count : d.count,
        price: data.id === d.id ? data.price : d.price,
      }))]);
    }
    //listener for data
    //...
    return () => {
      //cleaner function
    }
  }, [])
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
