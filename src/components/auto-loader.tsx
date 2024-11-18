import { useEffect, useRef } from "react";
import DataLoader from "./loaders/data-loader";
import TextBtn from "./element/button/text-btn";

interface prp {
  loading: boolean;
  error: any;
  handleLoader: () => any;
  showCondition: boolean;
}

export default function AutoDataLoader({
  error,
  handleLoader,
  loading,
  showCondition,
}: prp) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Component is visible");
          handleLoader();
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.1,
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef!.current) {
        observer.unobserve(componentRef!.current);
      }
    };
  }, [componentRef.current]);

  return (
    <DataLoader loading={loading} error={error}>
      {showCondition && (
        <div
          className="w-full flex justify-center items-center"
          ref={componentRef}
        >
          <TextBtn handler={handleLoader} className="mt-1" value="Load more" />
        </div>
      )}
    </DataLoader>
  );
}
