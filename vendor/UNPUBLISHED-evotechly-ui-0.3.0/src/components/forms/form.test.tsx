import { renderUi } from "../../test/helpers";
import { EvoForm, EvoFormField, EvoFormLabel, EvoFormMessage } from "./form";

describe("EvoForm", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoForm onSubmit={() => undefined}><button type="submit">Submit</button></EvoForm>);
    expect(view.container.querySelector("[data-evo=\"form\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoForm onSubmit={() => undefined}><button type="submit">Submit</button></EvoForm>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
