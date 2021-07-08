import { fireEvent, render, screen } from "@testing-library/react";
import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider";
import userEvent from "@testing-library/user-event";
import { md5ProviderFetchResolvedOnce } from "../testUtils/utils";

const md5Value = "098f6bcd4621d373cade4e832627b4f6";

jest.spyOn(window, "fetch");

describe("Md5Form", () => {
  test("submit fetch data", async () => {
    const data = "test";
    md5ProviderFetchResolvedOnce(window.fetch, md5Value);

    render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /send/i });

    userEvent.type(input, data);

    await userEvent.click(button);

    const md5Element = await screen.findByText(md5Value);

    expect(md5Element).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://api.hashify.net/hash/md5/hex",
      {
        body: data,
        method: "POST",
      }
    );
  });

  test("text given by the user is visible on the page", () => {
    const data = "test";

    const { container } = render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByRole("textbox");

    userEvent.type(input, data);

    const textElement = container.querySelector(".data-text");

    expect(textElement).toBeInTheDocument();
    expect(textElement.textContent).toBe(data);
  });

  test("changing text by the user clears md5 result", async () => {
    const oldData = "test";
    const newData = "data";

    md5ProviderFetchResolvedOnce(window.fetch, md5Value);

    render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /send/i });

    userEvent.type(input, oldData);

    await userEvent.click(button);
    await screen.findByText(md5Value);

    fireEvent.change(input, { target: { value: newData } });
    const md5Element = screen.queryByText(md5Value);

    expect(md5Element).not.toBeInTheDocument();
  });
});
