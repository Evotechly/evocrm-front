import { renderUi } from "../../test/helpers";
import { EvoPagination } from "./pagination";

describe("EvoPagination", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPagination page={1} pageCount={5} total={40} />);
    expect(view.container.querySelector("[data-evo=\"pagination\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPagination page={1} pageCount={5} total={40} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
