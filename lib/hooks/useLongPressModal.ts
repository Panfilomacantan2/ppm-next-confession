// hooks/useLongPressModal.ts
import { useState } from "react";
import { useLongPress } from "use-long-press";

export const useLongPressModal = (onTrigger?: () => void) => {
  const [open, setOpen] = useState(false);

  const bind = useLongPress(
    () => {
      setOpen(true);
      onTrigger?.();
    },
    {
      threshold: 600,
      captureEvent: true,
      cancelOnMovement: true,
    },
  );

  return {
    bind,
    open,
    setOpen,
  };
};
