export const Button = ({label, type = 'primary'}) => {
  return <button className={`btn ${type}`}>{label}</button>
}
