interface prp {
  is_online?: boolean;
  imageUrl?: string;
}

export default function ProfilePhoto({ is_online }: prp) {
  return (
    <div className="flex items-center relative">
      <div className="rounded-full dark:bg-white bg-indigo-600 w-14 h-14 overflow-hidden"></div>
      {is_online && (
        <span className="w-4 h-4 absolute right-0 bottom-0 bg-green-600 rounded-full border border-white"></span>
      )}
    </div>
  );
}
