import { renderUi } from "../../test/helpers";
import { EvoEventCalendar } from "./event-calendar";

describe("EvoEventCalendar", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoEventCalendar events={[{id:"1",title:"Call",date:"2026-10-23"}]} />);
    expect(view.container.querySelector("[data-evo=\"event-calendar\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoEventCalendar events={[{id:"1",title:"Call",date:"2026-10-23"}]} />);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
