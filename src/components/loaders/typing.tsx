interface prp {
  isTyping?: boolean;
  children: any;
}

export default function TypingStatus({ isTyping, children }: prp) {
  return isTyping ? (
    <div className="flex gap-1 items-center">
      <div className="flex items-center pt-1">
        <span className="loading loading-dots loading-xs flex items-center"></span>
      </div>
      <p>is typing</p>
    </div>
  ) : (
    <>{children}</>
  );
}
