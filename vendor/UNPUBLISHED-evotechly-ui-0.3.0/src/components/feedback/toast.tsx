import { Toaster as SonnerToaster, toast } from "sonner";
import { useTheme } from "../../lib/use-theme";

export function EvoToaster() {
  const theme = useTheme();
  return (
    <SonnerToaster
      data-evo="toast"
      className="evo-toaster"
      theme={theme}
      containerAriaLabel="Toast notifications"
    />
  );
}

export { toast };
export const Toaster = EvoToaster;
