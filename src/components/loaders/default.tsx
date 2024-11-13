interface prp {
  loading?: boolean;
  children: any;
}

export default function BtnLoader({ loading, children }: prp) {
  return (
    <div className="w-full flex justify-center items-center">
      {loading ? (
        <span className="loading loading-ring loading-sm"></span>
      ) : (
        children
      )}
    </div>
  );
}
