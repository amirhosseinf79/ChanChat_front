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
    if (!componentRef) return;

    const handleVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Component is visible");
          handleLoader();
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.2,
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [componentRef]);

  return (
    <DataLoader loading={loading} error={error}>
      {showCondition && (
        <div
          className="w-full flex justify-center items-center p-5"
          ref={componentRef}
        >
          <TextBtn handler={handleLoader} className="mt-1" value="Load more" />
        </div>
      )}
    </DataLoader>
  );
}
