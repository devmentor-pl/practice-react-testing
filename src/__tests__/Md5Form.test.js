import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {getMd5} from './../providers/md5Provider';
import Md5Form from './../components/Md5Form';


jest.spyOn(window, 'fetch');

describe('get', () => {
	it('should render input', function () {
		render(<Md5Form getMd5={getMd5} />);

		const inputEl = screen.getByLabelText('')

		expect(inputEl).toBeInTheDocument();
	});

	it('return ok if text is provider to data.text', async function () {
		render(<Md5Form getMd5={getMd5} />);
		const testText = 'Test';
		const inputEl = screen.getByLabelText('');
		userEvent.type(inputEl, testText);

		const displayedText = await screen.findByText(testText);

		expect(displayedText).toBeInTheDocument();
	});

	it('should fetch data from API when send request', async function () {
		const {container} = render(<Md5Form getMd5={getMd5} />)

		const data = '098f6bcd4621d373cade4e832627b4f6';

		const inputEl = screen.getByLabelText('');
		const buttonElement = screen.getByRole('button', { name: /send/i });
		const strongElement = container.querySelector('.data-md5');

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return {Digest: data}
			}
		});

		userEvent.type(inputEl, 'test');
		userEvent.click(buttonElement);

		await waitFor(() => {
			expect(strongElement).toBeInTheDocument();
			expect(strongElement.textContent).toBe(data)
		})
	});
})