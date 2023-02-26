import {
  render,
  screen,
  fireEvent,
  unmountComponentAtNode,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider";

/*let container = null;
beforeEach(() => {
  // ustaw element DOM jako cel renderowania
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // posprzątaj po zakończeniu
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});*/

describe("<Md5Form>", () => {
  test("input text - proper class", async () => {
    render(<Md5Form getMd5={getMd5} />);

    const mockTarget = { value: "napis" };

    const spy = jest.spyOn(Md5Form, "handleChange");

    Md5Form.handleChange(mockTarget);
    const element = screen.queryByText(`.data-text`);
    expect(element.innerText).toBe("napis");
  });
});
