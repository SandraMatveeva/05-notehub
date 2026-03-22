interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return <p>Error: {message}</p>;
}