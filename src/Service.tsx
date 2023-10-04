interface Props {
    name: String
}
const Service = ({name}: Props) => {
  return (
    <li className='serviceOption'>
        <span>{name}</span>
    </li>
  )
}

export default Service