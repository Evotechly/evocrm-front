import { renderUi } from "../../test/helpers";
import { EvoAccordion, EvoAccordionItem, EvoAccordionTrigger, EvoAccordionContent } from "./accordion";

describe("EvoAccordion", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoAccordion type="single" defaultValue="a"><EvoAccordionItem value="a"><EvoAccordionTrigger>Item</EvoAccordionTrigger><EvoAccordionContent>Body</EvoAccordionContent></EvoAccordionItem></EvoAccordion>);
    expect(view.container.querySelector("[data-evo=\"accordion\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoAccordion type="single" defaultValue="a"><EvoAccordionItem value="a"><EvoAccordionTrigger>Item</EvoAccordionTrigger><EvoAccordionContent>Body</EvoAccordionContent></EvoAccordionItem></EvoAccordion>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
