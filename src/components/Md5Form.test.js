import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Md5Form from './Md5Form';
import * as md5Provider from '../providers/md5Provider';

describe('Md5Form', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});
    
	test('renders input and send button', () => {
		render(<Md5Form getMd5={() => Promise.resolve('')} />);

		expect(screen.getByRole('textbox')).toBeInTheDocument();

		expect(
			screen.getByRole('button', {
				name: /send/i,
			}),
		).toBeInTheDocument();
	});

	test('shows typed text inside .data-text', () => {
		const { container } = render(<Md5Form getMd5={() => Promise.resolve('')} />);

		userEvent.type(screen.getByRole('textbox'), 'React');

		expect(container.querySelector('.data-text')).toHaveTextContent('React');
	});

	test('calls getMd5 with entered value after submit', () => {
		const spyGetMd5 = jest.spyOn(md5Provider, 'getMd5');
		spyGetMd5.mockResolvedValue('hash');

		render(<Md5Form getMd5={spyGetMd5} />);

		userEvent.type(screen.getByRole('textbox'), 'React');

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(spyGetMd5).toHaveBeenCalledTimes(1);

		expect(spyGetMd5).toHaveBeenCalledWith('React');
	});

	test('loads fetched md5 into .data-md5 after submit', async () => {
		const spyGetMd5 = jest.spyOn(md5Provider, 'getMd5');

		const digest = '50ce2da63bea6a618e7578fa50690040';

		spyGetMd5.mockResolvedValue(digest);

		const { container } = render(<Md5Form getMd5={spyGetMd5} />);

		userEvent.type(screen.getByRole('textbox'), 'React');

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(spyGetMd5).toHaveBeenCalledTimes(1);
		expect(spyGetMd5).toHaveBeenCalledWith('React');

		await screen.findByText(digest);

		expect(container.querySelector('.data-md5')).toHaveTextContent(digest);
	});

	test('clears md5 when input value changes', async () => {
		const spyGetMd5 = jest.spyOn(md5Provider, 'getMd5');

		const digest = '50ce2da63bea6a618e7578fa50690040';

		spyGetMd5.mockResolvedValue(digest);

		const { container } = render(<Md5Form getMd5={spyGetMd5} />);

		userEvent.type(screen.getByRole('textbox'), 'React');

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		await screen.findByText(digest);

		expect(container.querySelector('.data-md5')).toHaveTextContent(digest);

		userEvent.type(screen.getByRole('textbox'), '123');

		expect(container.querySelector('.data-md5')).toHaveTextContent('');
	});
});
