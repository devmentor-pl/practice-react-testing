import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { getMd5 } from '../providers/md5Provider';
import Md5Form from '../components/Md5Form';

// czy wysłanie formularza (event submit) powoduje wczytanie załadowanie danych do .data-md5
// czy zmiana danych w <input> powoduje wyczyszczenie .data-md5

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
	const { input, container } = setup();
	const data = '900150983cd24fb0d6963f7d28e17f72';

	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return { Digest: data };
		},
	});

	act(() => userEvent.type(input, 'abc'));

	const submitBtn = screen.getByRole('button', { name: /send/i });
	await act(async () => userEvent.click(submitBtn)); // -.-

	const dataMd5Element = container.querySelector('.data-md5');
	expect(dataMd5Element).toBeInTheDocument();
	expect(dataMd5Element.textContent).toBe(data);
});

it('clears text in .data-md5 element after changing input value', async () => {
	const { input, container } = setup();
	const data = '900150983cd24fb0d6963f7d28e17f72';

	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return { Digest: data };
		},
	});

	userEvent.type(input, 'abc');

	const submitBtn = screen.getByRole('button', { name: /send/i });
	await act(async () => userEvent.click(submitBtn)); // -.-

	const dataMd5Element = container.querySelector('.data-md5');
	expect(dataMd5Element).toBeInTheDocument();
	expect(dataMd5Element.textContent).toBe(data);

	userEvent.type(input, 'abcd');
	expect(dataMd5Element.textContent).toBe('');
});
