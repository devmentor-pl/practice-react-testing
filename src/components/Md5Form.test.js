import { render, screen, waitFor } from "@testing-library/react";
import Md5Form from "./Md5Form";
import userEvent from "@testing-library/user-event";
import { getMd5 } from "../providers/md5Provider";

jest.spyOn(window, "fetch");

function md5ProviderFetchResolvedOnce(mock) {
  mock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ Digest: "d41d8cd98f00b204e9800998ecf8427e" }),
  });
}

describe("getMd5()", () => {
  test("should .data-text element contain input value", () => {
    const { container } = render(<Md5Form />);

    const input = screen.getByRole("textbox");
    const inputTextSpan = container.querySelector(".data-text");

    userEvent.type(input, "Test text");

    expect(input.value).toBe("Test text");
    expect(inputTextSpan.textContent).toBe("Test text");
  });

  test("should .data-md5 element contain fetched md5", async () => {
    md5ProviderFetchResolvedOnce(window.fetch);

    const { container } = render(<Md5Form getMd5={getMd5} />); // nie wiem, czy dobrze robię, że przekazuję getMd5 do tego komponentu, ale tylko w ten sposób test przechodzi

    const submitButton = await screen.findByRole("button", { name: "send" });
    const md5Strong = container.querySelector(".data-md5");

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(md5Strong.textContent).toBe("d41d8cd98f00b204e9800998ecf8427e");
    });
  });

  test("should .data-md5 be cleared when input change", async () => {
    md5ProviderFetchResolvedOnce(window.fetch);
    const { container } = render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByRole("textbox");
    const md5Strong = container.querySelector(".data-md5");
    const submitButton = await screen.findByRole("button", { name: "send" });
    const inputTextSpan = container.querySelector(".data-text");

    userEvent.type(input, "Test text");
    userEvent.click(submitButton);
    userEvent.type(input, " changed");

    expect(inputTextSpan.textContent).toBe("Test text changed");
    await waitFor(() => {
      expect(md5Strong.textContent).toBe(""); // totalnie nie rozumiem zachowania tych testów... Test przechodzi zarówno przy wartości .toBe(""), jak i .toBe('d41d8cd98f00b204e9800998ecf8427e'), ale już kiedy wpiszę cokolwiek innego np. .toBe('fddsf') to już nie przechodzi... Oczywiście całość jest niepoprawna i zabrakło mi już pomysłów na rozwiązanie
    });
  });
});
