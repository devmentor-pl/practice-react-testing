import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';
import { wait } from '@testing-library/user-event/dist/utils';

describe('Md5Form', () => {
	test('input works -> should create a span element with class data-text', async () => {
		expect.assertions(2);
		render(<Md5Form />);

		const value = 'abcd';
		const input = await screen.findByRole('textbox');
		fireEvent.change(input, { target: { value } });

		const span = await screen.findByText(value);

		expect(span).toHaveClass('data-text');
		expect(span.textContent).toBe(value);
	});
	test('submitting should load data to data-md5 class element', async () => {
		expect.assertions(2);
		render(<Md5Form getMd5={getMd5} />);

		const value = 'abcd';
		const md5Value = 'e2fc714c4727ee9395f324cd2e7f331f';

		const spy = jest.spyOn(window, 'fetch');
		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: md5Value };
			},
		});

		const input = await screen.findByRole('textbox');
		fireEvent.change(input, { target: { value } });

		const button = await screen.findByRole('button');
		fireEvent.click(button);

		await waitFor(async () => {
			const strong = await screen.findByText(md5Value);
			expect(strong).toBeInTheDocument();
			expect(strong).toHaveClass('data-md5');
		});

		spy.mockClear();
	});
	test('onChange input should clear md5 hash translate', async () => {
		render(<Md5Form getMd5={getMd5} />);

		const value = 'abcd';
		const md5Value = 'e2fc714c4727ee9395f324cd2e7f331f';

		const spy = jest.spyOn(window, 'fetch');
		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: md5Value };
			},
		});

		const input = await screen.findByRole('textbox');
		fireEvent.change(input, { target: { value } });

		const button = await screen.findByRole('button');
		fireEvent.click(button);

		await waitFor(async () => {
			const strong = await screen.findByText(md5Value);
			expect(strong).toBeInTheDocument();
		});
		await waitFor(async () => {
			const strong = await screen.findByText(md5Value);
			fireEvent.change(input, { target: { value: 'zmiana' } });
			expect(strong.textContent).toBe('');
		});
		spy.mockClear();
	});
});
