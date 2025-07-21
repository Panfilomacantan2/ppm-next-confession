export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
      <div
        className="text-surface inline-block h-8 w-8 animate-[spin_300ms_linear_infinite] rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-foreground/80"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>

      <span>
        <span className="sr-only">Loading...</span>
        <span className="text-foreground/80 text-sm">Loading...</span>
      </span>
    </div>
  );
}
