import style from "./input.module.css";

interface prp {
  value?: string;
  className?: string;
  onChange: (v: string) => unknown;
  placeholder?: string;
  lable?: string;
  type?: string;
}

export default function DefaultInput({
  className,
  onChange,
  value,
  placeholder,
  lable,
  type,
}: prp) {
  return (
    <div className="relative bg-inherit">
      {lable && (
        <div className="-mb-[0.55rem] relative flex">
          <p className={`z-10 ${style.textBordered}`}>{lable}</p>
        </div>
      )}
      <input
        type={type ?? undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 dark:bg-white dark:text-black rounded-md w-full ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
