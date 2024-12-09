import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMd5 } from "./../providers/md5Provider";
import Md5Form from "./Md5Form";

xdescribe("<Md5Form/>", () => {
  it("input-value", async () => {
    const text = "test";

    render(<Md5Form />);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);

    const span = await screen.findByText(text);

    expect(span).toBeInTheDocument();
  });

  it("input-strong", async () => {
    const text = "test";
    const md5 = "098f6bcd4621d373cade4e832627b4f6";
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

  it("input-change", async () => {
    const text = "test";
    const md5 = "098f6bcd4621d373cade4e832627b4f6";
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

      userEvent.type(input, "a");

      await waitFor(async () => {
        const strong = screen.queryByText(md5);

        expect(strong).not.toBeInTheDocument();
      });
    });

    spy.mockClear();
  });
});
