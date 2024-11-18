interface prp {
  is_online?: boolean;
  imageUrl?: string;
  size?: "lg" | "md" | "sm";
  hidden?: boolean;
}

export default function ProfilePhoto({ is_online, size, hidden }: prp) {
  return (
    <div className="flex items-center relative">
      <div
        className={`rounded-full dark:bg-white bg-indigo-600 overflow-hidden ${
          size == "md" ? "w-12 h-12" : size == "lg" ? "w-14 h-14" : "h-9 w-9"
        } ${hidden ? "opacity-0" : "opacity-100"}`}
      ></div>
      {is_online && (
        <span className="w-4 h-4 absolute right-0 bottom-0 bg-green-600 rounded-full border border-white"></span>
      )}
    </div>
  );
}
