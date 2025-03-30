import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Md5Form from "../components/Md5Form";
import { getMd5 } from "../providers/md5Provider";

describe("Md5Form component", () => {
  const mockInputValue = "1000";
  const mockReceivedData = "a9b7ba70783b617e9998dc4dd82eb3c5";
  const mockHeaders = { body: mockInputValue, method: "POST" };

  it("render input element", () => {
    render(<Md5Form />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("changing input value render the value in span element with '.data-text' class", () => {
    const { container } = render(<Md5Form />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Lorem ipsum dolor" } });

    const spanElement = container.querySelector(".data-text");

    expect(spanElement).toHaveTextContent("Lorem ipsum dolor");
  });

  it("fetch hash string when send request", async () => {
    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: mockReceivedData }),
    });

    const data = await getMd5(mockInputValue);

    expect(data).toBe(mockReceivedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(
      "https://api.hashify.net/hash/md5/hex",
      mockHeaders
    );

    spy.mockRestore();
  });

  it("submit form puts loaded data into text of strong element with '.data-md5' class", async () => {
    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: mockReceivedData }),
    });

    const { container } = render(<Md5Form getMd5={getMd5} />);

    const submitButton = screen.getByRole("button", { name: "send" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const strongElement = container.querySelector(".data-md5");
      expect(strongElement).toHaveTextContent(mockReceivedData);
    });

    spy.mockRestore();
  });

  it("changing input element clear strong element with '.data-md5' class", async () => {
    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: mockReceivedData }),
    });

    const { container } = render(<Md5Form getMd5={getMd5} />);

    const submitButton = screen.getByRole("button", { name: "send" });
    fireEvent.click(submitButton);

    const inputElement = screen.getByRole("textbox");
    const strongElement = container.querySelector(".data-md5");

    await waitFor(() => {
      expect(strongElement).toHaveTextContent(mockReceivedData);
    });

    fireEvent.change(inputElement, {
      target: { value: "Lorem ipsum dolor" },
    });

    expect(strongElement).toHaveTextContent("");
    spy.mockRestore();
  });
});
