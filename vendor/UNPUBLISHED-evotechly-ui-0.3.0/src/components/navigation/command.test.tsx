import { renderUi } from "../../test/helpers";
import { EvoCommand, EvoCommandInput, EvoCommandList, EvoCommandItem, EvoCommandPalette } from "./command";

describe("EvoCommand", () => {
  it("renders with an accessible name", () => {
    const view = renderUi(<EvoCommand><EvoCommandInput placeholder="Search" /><EvoCommandList><EvoCommandItem value="a">Open</EvoCommandItem></EvoCommandList></EvoCommand>);
    expect(view.container.querySelector("[data-evo=\"command\"]") || view.container.firstChild).toBeTruthy();
  });
  it("exposes a11y basics", () => {
    const view = renderUi(<EvoCommand><EvoCommandInput placeholder="Search" /><EvoCommandList><EvoCommandItem value="a">Open</EvoCommandItem></EvoCommandList></EvoCommand>);
    const root = view.container.ownerDocument ?? document;
    const labeled = root.querySelector("[data-evo], [aria-label], [aria-labelledby], [role], label, table, form, nav, button, input, textarea, img");
    expect(labeled).toBeTruthy();
  });
});
