/* eslint-disable testing-library/no-wait-for-side-effects */
import { getMd5 } from "../providers/md5Provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Md5Form from "./Md5Form";
import { waitFor } from "@testing-library/react";

describe("getMd5()", () => {
  test("should add data to element", async () => {
    render(<Md5Form />);
    const text = "sddfdss";
    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
  });
  test("submit of form - add data", async () => {
    render(<Md5Form getMd5={getMd5} />);
    const text = "w";
    const md5 = "f1290186a5d0b1ceab27f4e77c0c5d68";

    const input = await screen.findByRole("textbox");
    userEvent.type(input, text);

    const button = await screen.findByRole("button");
    userEvent.click(button);

    await waitFor(async () => {
      const str = await screen.findByText(md5);
      expect(str).toBeInTheDocument();
    });
  });

  test("should clear input", async () => {
    const text = "w";
    const md5 = "f1290186a5d0b1ceab27f4e77c0c5d68";
    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValueOnce({
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
      const str = await screen.findByText(md5);
      expect(str).toBeInTheDocument();

      userEvent.type(input, "w");
      await waitFor(() => {
        const str = screen.queryByText(md5);
        expect(str).not.toBeInTheDocument();
      });
    });
  });
});
