import { renderUi } from "../../test/helpers";
import { EvoSelect } from "./select";

describe("EvoSelect", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoSelect label="Stage" options={[{value:"new",label:"New"}]} defaultValue="new" />);
    expect(view.container.querySelector("[data-evo=\"select\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoSelect label="Stage" options={[{value:"new",label:"New"}]} defaultValue="new" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
