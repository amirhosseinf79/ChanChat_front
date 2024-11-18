interface prp {
  error: any;
  className?: string;
}

export default function ErrorBox({ error, className }: prp) {
  return (
    <>
      {error && (
        <div className="flex flex-col gap-1 text-white">
          {Object.keys(error).map((key: string) =>
            error[key].map((msg: string) => (
              <div
                className={`px-2 py-1 text-justify rounded-md ${className} flex gap-1`}
              >
                {msg.startsWith("This field") && (
                  <div className="font-bold">{key}</div>
                )}
                <div>{msg.replace("This field", "")}</div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
