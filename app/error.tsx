'use client'

type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center justify-center my-8 lg:my-8">
      <span className="px-4 py-2 text-red-500 border rounded border-red-500/50 bg-red-500/10"> {message}</span>
    </div>
  )
}

export default ErrorMessage
