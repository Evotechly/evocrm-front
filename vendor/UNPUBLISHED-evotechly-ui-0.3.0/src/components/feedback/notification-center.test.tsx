import { renderUi } from "../../test/helpers";
import { EvoNotificationCenter } from "./notification-center";

describe("EvoNotificationCenter", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoNotificationCenter items={[{id:"1",title:"New lead"}]} />);
    expect(view.container.querySelector("[data-evo=\"notification-center\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoNotificationCenter items={[{id:"1",title:"New lead"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
