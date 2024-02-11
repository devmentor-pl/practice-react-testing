import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

describe("Md5Form", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	jest.spyOn(window, "fetch");
	const returnedData = "d41d8cd98f00b204e9800998ecf8427e";

	function md5ProviderFetchResolvedOnce(mock) {
		mock.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ Digest: returnedData }),
		});
	}

	test("text typed in input is rendered in the element with class `.data-text`", async () => {
		render(<Md5Form getMd5={getMd5} />);
		const input = screen.getByRole("textbox");
		const text = "hello";
		expect(input).toBeInTheDocument();
		userEvent.type(input, text);
		const renderedText = screen.getByText(text, { className: "data-text" });
		expect(renderedText).toBeInTheDocument();
	});

	test("fetched data is rendered in element with class `.data.md5` after `submit` button is clicked", async () => {
		const { container } = render(<Md5Form getMd5={getMd5} />);
		const submitButton = screen.getByRole("button");
		// eslint-disable-next-line testing-library/no-container
		const md5Element = container.querySelector(".data-md5");
		expect(md5Element).toBeInTheDocument();
		md5ProviderFetchResolvedOnce(window.fetch);
		userEvent.click(submitButton);
		await waitFor(() => {
			expect(md5Element.textContent).toBe(returnedData);
		});
	});

	test("changing input value should clear content of element with class `.data-md5`", async () => {
		const { container } = render(<Md5Form getMd5={getMd5} />);
		const input = screen.getByRole("textbox");
		const text = "hello";
		const text2 = "world";
		const md5Element = container.querySelector(".data-md5");
		const submitButton = screen.getByRole("button");
		md5ProviderFetchResolvedOnce(window.fetch);
		userEvent.type(input, text);
		userEvent.click(submitButton);
		await waitFor(() => {
			expect(md5Element.textContent).toBe(returnedData);
		});
		userEvent.type(input, text2);
		await waitFor(() => {
			expect(md5Element.textContent).toBe("");
		});
	});
});
