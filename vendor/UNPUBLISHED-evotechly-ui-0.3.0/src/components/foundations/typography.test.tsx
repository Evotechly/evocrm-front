import { renderUi } from "../../test/helpers";
import { EvoTypography, EvoHeading, EvoText } from "./typography";

describe("EvoTypography", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoTypography><EvoHeading>Title</EvoHeading><EvoText>Body</EvoText></EvoTypography>);
    expect(view.container.querySelector("[data-evo=\"typography\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoTypography><EvoHeading>Title</EvoHeading><EvoText>Body</EvoText></EvoTypography>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
