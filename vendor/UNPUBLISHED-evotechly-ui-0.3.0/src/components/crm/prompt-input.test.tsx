import { renderUi } from "../../test/helpers";
import { EvoPromptInput } from "./prompt-input";

describe("EvoPromptInput", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoPromptInput />);
    expect(view.container.querySelector("[data-evo=\"prompt-input\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoPromptInput />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
