import * as React from "react";
import { render, type RenderOptions } from "@testing-library/react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div data-product="crm" data-theme="light">{children}</div>;
}

export function renderUi(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Wrapper, ...options });
}
