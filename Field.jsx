export default function Field({ label, value, onChange, ...rest }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </label>
  )
}
