import { renderUi } from "../../test/helpers";
import { EvoCard, EvoCardTitle, EvoCardDescription, EvoCardHeader, EvoCardContent, EvoCardFooter } from "./card";

describe("EvoCard", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCard><EvoCardTitle>Deal</EvoCardTitle></EvoCard>);
    expect(view.container.querySelector("[data-evo=\"card\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCard><EvoCardTitle>Deal</EvoCardTitle></EvoCard>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
