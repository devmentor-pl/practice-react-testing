import { getMd5 } from "../providers/md5Provider";
import Md5Form from "./Md5Form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Md5Form", () => {
    it("check if input exists", () => {
        render(<Md5Form getMd5={getMd5} />);

        const input = screen.getByLabelText("");

        expect(input).toBeInTheDocument();
    });
    it("check if correct text shows in the input", () => {
        render(<Md5Form getMd5={getMd5} />);

        const input = screen.getByLabelText("");
        userEvent.type(input, "kowalski");

        expect(input.value).toBe("kowalski");
    });
    it("check if correct text shows in the span", () => {
        const { container } = render(<Md5Form getMd5={getMd5} />);

        const input = screen.getByLabelText("");
        userEvent.type(input, "kowalski");
        const span = container.querySelector(".data-text");

        expect(span.textContent).toBe("kowalski");
    });
    it("check if function getMd5 is called", () => {
        const spy = jest.spyOn(window, "fetch");
        render(<Md5Form getMd5={getMd5} />);

        const button = screen.getByRole("button", { name: /send/i });
        userEvent.click(button);
        expect(spy).toBeCalledTimes(1);

        spy.mockRestore();
    });
    it("check if result of getMd5 is displayed in strong element with className data-md5 after sumbitting form", async () => {
        jest.spyOn(window, "fetch");
        const { container } = render(<Md5Form getMd5={getMd5} />);

        const resolvedPromise = "bulbul";

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { data: resolvedPromise };
            },
        });

        const input = screen.getByLabelText("");
        userEvent.type(input, "kowalski");

        const span = container.querySelector(".data-md5");

        const button = screen.getByRole("button", { name: /send/i });
        userEvent.click(button);

        waitFor(
            async () => await expect(span.textContent).toBe(resolvedPromise)
        );
    });
    it("check if change of input data clears what is displayed in element with className data-md5", async () => {
        jest.spyOn(window, "fetch");

        const resolvedPromise = "bulbul";

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { data: resolvedPromise };
            },
        });

        const { container } = render(<Md5Form getMd5={getMd5} />);

        const input = screen.getByLabelText("");
        userEvent.type(input, "kowalski");

        const span = container.querySelector(".data-md5");

        const button = screen.getByRole("button", { name: /send/i });
        userEvent.click(button);
        userEvent.type(input, "makarena");

        waitFor(async () => await expect(span.textContent).toBe(""));
    });
});
