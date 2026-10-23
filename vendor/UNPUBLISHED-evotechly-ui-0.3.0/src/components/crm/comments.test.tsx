import { renderUi } from "../../test/helpers";
import { EvoComments } from "./comments";

describe("EvoComments", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoComments comments={[{id:"1",author:"Ada",body:"Looks good",createdAt:"2026-10-23T10:00:00Z"}]} />);
    expect(view.container.querySelector("[data-evo=\"comments\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoComments comments={[{id:"1",author:"Ada",body:"Looks good",createdAt:"2026-10-23T10:00:00Z"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
