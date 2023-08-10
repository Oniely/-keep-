interface GreeterProps {
    name: string
}

export const Greeter = ({name}: GreeterProps) => {
  return (
    <div>Hello, {name}</div>
  )
}
