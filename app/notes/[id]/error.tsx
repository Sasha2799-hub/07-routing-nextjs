"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default Error;
