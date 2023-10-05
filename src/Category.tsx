import { useState, useEffect } from 'react'
import Service from "./Service";
import { Category as CategoryInterface, Service as ServiceInterface } from "./interface/hierachy"

interface Props {
    key: Number,
    item: CategoryInterface,
    state: CategoryInterface[],
    setState: (state: CategoryInterface[]) => void
}

const Category = ({item, state, setState}: Props) => {
    const [toggleOptions, setToggleOptions] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [type, setType] = useState('category' || 'service')
    const [toggleMainPlus, setToggleMainPlus] = useState(true)
    const [text, setText] = useState('')
    const values = item
    console.log(item.children, item.name);

    useEffect(() => {
        console.log(state)
      }, [state])
    
  return (
    <ul className="category">
        <div className='details'>
            <p className='title'>{values.name}</p>
            {
                toggleInput
                ?
                <>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button className='plusButton' onClick={() => {
                        if (type === 'category') {
                            const data: CategoryInterface = {
                                name: text,
                                children: []
                            }
                            values.children?.push(data)
                            setState([...state])
                            setText('')
                            setToggleInput(false)
                            setToggleMainPlus(true)
                            localStorage.setItem('categories', JSON.stringify(state))
                        } else {
                            const data: ServiceInterface = {
                                name: text
                            }
                            values.children?.push(data)
                            setState([...state])
                            setText('')
                            setToggleInput(false)
                            setToggleMainPlus(true)
                            localStorage.setItem('categories', JSON.stringify(state))
                        }
                    }}>&#x002B;</button>
                </>
                : null
            }
            {
                toggleOptions
                ? <div className="options">
                    <p>What do you want to create?</p>
                    <button className='addCategory' onClick={() => {
                        setToggleInput(true)
                        setType('category')
                        setToggleOptions(false)
                    }}>Category</button>
                    <button className='addService' onClick={() => {
                        setToggleInput(true)
                        setType('service')
                        setToggleOptions(false)
                    }}>Service</button>
                </div>
                : null
            }
            {
                toggleMainPlus
                ?
                <button className='plusButton' onClick={
                    () => {
                        setToggleOptions(true)
                        setToggleMainPlus(false)
                    }}
                >&#x002B;</button>
                : null
            }
        </div>
        {
            (values.children)
            ?
            values.children.map((val: CategoryInterface, index) => (
                val.children
                ?
                <li>
                    <Category
                    item={val}
                    key={index}
                    state={state}
                    setState={setState} />
                </li>
                : <Service name={val.name} />
            ))
            : null
        }
    </ul>
  )
}

export default Category