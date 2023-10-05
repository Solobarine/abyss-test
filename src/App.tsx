import { useEffect, useState } from 'react'
import Category from './Category'
import { Category as CategoryInterface } from './interface/hierachy'
import Service from './Service'
import seedData from './seedData'
import './App.css'

const App = () => {
  const [data, setData] = useState<never[] | CategoryInterface[]>([])
  const savedData = localStorage.getItem('categories') as string
  console.log(data);

  const updateState = (state: CategoryInterface[]) => {
    setData(state)
  }

  useEffect(() => {
    (savedData)
    ? setData(JSON.parse(savedData))
    : setData(seedData)
  }, [])
  
  return (
    <div>
      <h3>Abyss Test</h3>
      {
        data.map((item, index) => (
          (item.children)
          ? <Category item={item} key={index} state={data} setState={updateState} />
          : <Service name={item.name} />
        ))
      }
    </div>
  )
}

export default App
