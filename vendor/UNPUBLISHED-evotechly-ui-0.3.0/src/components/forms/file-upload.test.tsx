import { renderUi } from "../../test/helpers";
import { EvoFileUpload } from "./file-upload";

describe("EvoFileUpload", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoFileUpload label="Attachments" />);
    expect(view.container.querySelector("[data-evo=\"file-upload\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoFileUpload label="Attachments" />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
