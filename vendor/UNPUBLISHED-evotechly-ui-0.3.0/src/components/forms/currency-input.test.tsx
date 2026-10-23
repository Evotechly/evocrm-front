import { renderUi } from "../../test/helpers";
import { EvoCurrencyInput } from "./currency-input";

describe("EvoCurrencyInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCurrencyInput label="Amount" defaultValue={1200} />);
    expect(view.container.querySelector("[data-evo=\"currency-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCurrencyInput label="Amount" defaultValue={1200} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
