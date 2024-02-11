import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';

describe('<Md5Form />', () => {
	test('text from input should be in .data-text', () => {
		render(<Md5Form />);

		const inputElement = screen.getByRole('textbox');
		const inputText = 'example text';
		userEvent.type(inputElement, inputText);

		const renderedText = screen.getByText(inputText, {
			className: 'data-text',
		});
		expect(renderedText).toBeInTheDocument();
	});

	test('submit form should load received data into .data-md5', async () => {
		jest.spyOn(window, 'fetch');

		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: 'd41d8cd98f00b204e9800998ecf8427e' };
			},
		});

		render(<Md5Form getMd5={getMd5} />);

		const submitBtn = screen.getByRole('button', { name: /send/i });
		userEvent.click(submitBtn);

		const data = await screen.findByText('d41d8cd98f00b204e9800998ecf8427e', {
			className: 'data-md5',
		});

		expect(data).toBeInTheDocument();
	});

	test('change data in <input> should clear the contents of .data-md5', async () => {
		jest.spyOn(window, 'fetch');

		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: 'd41d8cd98f00b204e9800998ecf8427e' };
			},
		});

		render(<Md5Form getMd5={getMd5} />);

		const inputElement = screen.getByRole('textbox');
		const submitBtn = screen.getByRole('button', { name: /send/i });
		userEvent.click(submitBtn);

		const data = await screen.findByText('d41d8cd98f00b204e9800998ecf8427e', {
			className: 'data-md5',
		});

		expect(data).toBeInTheDocument();

		userEvent.clear(inputElement);
		userEvent.type(inputElement, 'new text');

		const newData = screen.queryByText('d41d8cd98f00b204e9800998ecf8427e', {
			className: 'data-md5',
		});

		expect(newData).not.toBeInTheDocument();
	});
});
