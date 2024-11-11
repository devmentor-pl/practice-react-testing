import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider";

describe("<Md5Form>", () => {
  it("whether text entered into a form field appears in an element of class .data-text", async () => {
    const text = "abc";

    render(<Md5Form />);

    const input = await screen.findByRole("textbox");

    userEvent.type(input, text);

    const span = await screen.findByText(text);

    expect(span).toBeInTheDocument();
  });

  it("whether sending the form (event submit) loads the downloaded data into an element of class .data-md5", async () => {
    const text = "abc";
    const md5 = "900150983cd24fb0d6963f7d28e17f72";

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
      const dataMd5 = await screen.findByText(md5);
      expect(dataMd5).toBeInTheDocument();
    });

    spy.mockClear();
  });

  it("whether changing data in <input> clears the contents of the .data-md5 element", async () => {
    const text = "abc";
    const md5 = "900150983cd24fb0d6963f7d28e17f72";

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
      const dataMd5 = await screen.findByText(md5);
      expect(dataMd5).toBeInTheDocument();

      userEvent.type(input, "1");

      await waitFor(() => {
        const dataMd5 = screen.queryByText(md5);

        expect(dataMd5).not.toBeInTheDocument();
      });
    });

    spy.mockClear();
  });
});
