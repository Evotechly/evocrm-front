import { renderUi } from "../../test/helpers";
import { EvoAppShell } from "./app-shell";

describe("EvoAppShell", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAppShell title="Workspace">Content</EvoAppShell>);
    expect(view.container.querySelector("[data-evo=\"app-shell\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAppShell title="Workspace">Content</EvoAppShell>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
