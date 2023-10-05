interface Props {
    name: String
}
const Service = ({name}: Props) => {
  return (
    <li className='serviceOption'>
        <p>{name}</p>
    </li>
  )
}

export default Service