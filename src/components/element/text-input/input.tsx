import style from "./input.module.css";

interface prp {
  value?: string;
  className?: string;
  onChange: (v: string) => unknown;
  handleEnter?: () => any;
  handleKeyDown?: () => any;
  placeholder?: string;
  lable?: string;
  type?: string;
  disabled?: boolean;
}

export default function DefaultInput({
  className,
  onChange,
  handleEnter,
  handleKeyDown,
  value,
  placeholder,
  lable,
  type,
  disabled,
}: prp) {
  function handleEnterEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter" && value && handleEnter) {
      handleEnter();
      onChange("");
    } else {
      if (handleKeyDown) handleKeyDown();
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
        dir="auto"
        type={type ?? undefined}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 dark:bg-white text-black rounded-md w-full ${className}`}
        placeholder={placeholder}
        onKeyDown={handleEnterEvent}
        disabled={disabled}
      />
    </div>
  );
}
