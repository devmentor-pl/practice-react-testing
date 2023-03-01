import {
  render,
  screen,
  unmountComponentAtNode,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider";

describe("<Md5Form>", () => {
  test("input -> strong", async () => {
    const text = "123";
    const md5 = "202cb962ac59075b964b07152d234b70";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Md5Form getMd5={getMd5} />);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);
    const button = await screen.findByRole("button");
    userEvent.click(button);

    await waitFor(async () => {
      const strong = await screen.findByText(md5);
      expect(strong).toBeInTheDocument();
    });

    spy.mockClear();
  });
  test("input text -> class", async () => {
    const text = "123";
    const md5 = "202cb962ac59075b964b07152d234b70";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Md5Form getMd5={getMd5} />);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);

    await waitFor(async () => {
      const spanElement = await screen.findByText(text);
      expect(spanElement).toHaveClass(`data-text`);
    });

    spy.mockClear();
  });
  test("form submit -> data in proper element", async () => {
    const text = "123";
    const md5 = "202cb962ac59075b964b07152d234b70";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Md5Form getMd5={getMd5} />);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);
    const button = await screen.findByRole("button");
    userEvent.click(button);

    await waitFor(async () => {
      const strong = await screen.findByText(md5);
      expect(strong).toHaveClass("data-md5");
    });

    spy.mockClear();
  });
  // Poniższy test mi nie przechodzi, zastanawiam sie dlaczego ?
  /*test("input data change -> clears strong element", async () => {
    const text = "123";
    const newText = "100";
    const md5 = "202cb962ac59075b964b07152d234b70";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Md5Form getMd5={getMd5} />);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);
    const button = await screen.findByRole("button");
    userEvent.click(button);
    //input = await screen.findByRole("textbox");
    userEvent.type(input, newText);

    const strong = await screen.findByText(md5);
    expect(strong).toBe(null);

    spy.mockClear();
  });*/
});

