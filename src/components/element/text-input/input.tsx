import style from "./input.module.css";

interface prp {
  value?: string;
  className?: string;
  onChange: (v: string) => unknown;
  handleEnter?: () => any;
  placeholder?: string;
  lable?: string;
  type?: string;
}

export default function DefaultInput({
  className,
  onChange,
  handleEnter,
  value,
  placeholder,
  lable,
  type,
}: prp) {
  function handleEnterEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code == "Enter" && handleEnter) {
      handleEnter();
      onChange("");
    }
  }

  return (
    <div className="relative w-full bg-inherit">
      {lable && (
        <div className="-mb-[0.55rem] relative flex">
          <p className={`z-10 ${style.textBordered}`}>{lable}</p>
        </div>
      )}
      <input
        type={type ?? undefined}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 dark:bg-white text-black rounded-md w-full ${className}`}
        placeholder={placeholder}
        onKeyUp={handleEnterEvent}
      />
    </div>
  );
}
