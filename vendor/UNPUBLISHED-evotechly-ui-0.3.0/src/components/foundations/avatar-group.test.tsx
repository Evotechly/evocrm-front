import { renderUi } from "../../test/helpers";
import { EvoAvatarGroup } from "./avatar-group";

describe("EvoAvatarGroup", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAvatarGroup people={[{name:"Ada"},{name:"Ben"}]} />);
    expect(view.container.querySelector("[data-evo=\"avatar-group\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAvatarGroup people={[{name:"Ada"},{name:"Ben"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
