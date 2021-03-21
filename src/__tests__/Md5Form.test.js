import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getMd5 } from '../providers/md5Provider';
import Md5Form from '../components/Md5Form';

jest.spyOn(window, 'fetch');

const setup = () => {
	const utils = render(<Md5Form getMd5={getMd5} />);
	const input = screen.getByRole('textbox');
	return {
		input,
		...utils,
	};
};

it('renders form with one input', () => {
	const { input } = setup();
	expect(input).toBeInTheDocument();
});

it('shows text from input in .data-text element', () => {
	const { input, container } = setup();
	userEvent.type(input, 'abc');
	const dataTextElement = container.querySelector('.data-text');
	expect(dataTextElement).toBeInTheDocument();
	expect(dataTextElement.textContent).toBe('abc');
});

it('shows fetched data in .data-md5 element after submit', async () => {
	const { input } = setup();
	const data = '900150983cd24fb0d6963f7d28e17f72';
	const submitBtn = screen.getByRole('button', { name: /send/i });
	const dataMd5Element = screen.getByTestId('data-md5');

	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return { Digest: data };
		},
	});

	userEvent.type(input, 'abc');

	userEvent.click(submitBtn);

	await waitFor(() => {
		expect(dataMd5Element).toBeInTheDocument();
		expect(dataMd5Element.textContent).toBe(data);
	});
});

it('clears text in .data-md5 element after changing input value', async () => {
	const { input } = setup();
	const data = '900150983cd24fb0d6963f7d28e17f72';
	const submitBtn = screen.getByRole('button', { name: /send/i });
	const dataMd5Element = screen.getByTestId('data-md5');

	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return { Digest: data };
		},
	});

	userEvent.type(input, 'abc');
	userEvent.click(submitBtn);

	await waitFor(() => {
		expect(dataMd5Element).toBeInTheDocument();
		expect(dataMd5Element.textContent).toBe(data);	
	});

	userEvent.type(input, 'd');
	expect(dataMd5Element.textContent).toBe('');
});