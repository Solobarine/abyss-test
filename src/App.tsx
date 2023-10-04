import { useState } from 'react'
import Category from './Category'
import { Category as CategoryInterface } from './interface/hierachy'
import Service from './Service'
import seedData from './seedData'
import './App.css'

const App = () => {
  const [data, setData] = useState(seedData)
  console.log(data);

  const updateState = (state: CategoryInterface[]) => {
    setData(state)
  }
  
  return (
    <div>
      <h1>Abyss Test</h1>
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
