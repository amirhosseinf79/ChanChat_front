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
      className={`bg-white text-indigo-500 p-2 rounded-md w-20 disabled:bg-slate-100 disabled:text-slate-400 ${className}`}
      disabled={disabled}
    >
      <BtnLoader loading={loading}>{value}</BtnLoader>
    </button>
  );
}
