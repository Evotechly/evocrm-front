import { renderHook, waitFor } from "@testing-library/react";
import { useTheme } from "./use-theme";

describe("useTheme", () => {
  it("reads data-theme from the document", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    const { result } = renderHook(() => useTheme());
    await waitFor(() => expect(result.current).toBe("dark"));
    document.documentElement.setAttribute("data-theme", "light");
  });
});
