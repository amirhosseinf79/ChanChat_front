import BtnLoader from "../../loaders/default";

interface prp {
  handler?: () => any;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  value: string;
}

export default function DefaultBtn({
  className,
  disabled,
  handler,
  loading,
  value,
}: prp) {
  return (
    <button
      onClick={handler ?? undefined}
      className={`bg-indigo-500 text-indigo-100 p-2 rounded-md disabled:bg-indigo-200 disabled:text-indigo-400 ${className}`}
      disabled={disabled}
    >
      <BtnLoader loading={loading}>{value}</BtnLoader>
    </button>
  );
}
