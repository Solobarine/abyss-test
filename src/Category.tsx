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
                    <button onClick={() => {
                        if (type === 'category') {
                            const data: CategoryInterface = {
                                name: text,
                                children: []
                            }
                            values.children?.push(data)
                            setState([...state])
                            setToggleInput(false)
                            setToggleMainPlus(true)
                        } else {
                            const data: ServiceInterface = {
                                name: text
                            }
                            values.children?.push(data)
                            setState([...state])
                            setToggleInput(false)
                            setToggleMainPlus(true)
                        }
                    }}>&#x002B;</button>
                </>
                : null
            }
            {
                toggleOptions
                ? <div className="options">
                    <button onClick={() => {
                        setToggleInput(true)
                        setType('category')
                        setToggleOptions(false)
                    }}>Category</button>
                    <button onClick={() => {
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
                <button onClick={
                    () => {
                        setToggleOptions(true)
                        setToggleMainPlus(false)
                    }}
                >&#x002B;</button>
                : null
            }
        </div>
        {
            <div className='children'>
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
            </div>
        }
    </ul>
  )
}

export default Category