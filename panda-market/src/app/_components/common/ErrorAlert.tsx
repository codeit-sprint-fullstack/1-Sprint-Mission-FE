interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="bg-error-50 fixed left-0 right-0 top-0 z-50 p-4 text-center text-sm text-error-red">
      {message}
    </div>
  );
}
