import LoginForm from './LoginForm'

describe('mock', () => {
	it('jest.fn', () => {
		const mockFn = jest.fn()
		// Przy pomocy jest.fn() stworzyliśmy naszą pierwszą atrapę.

		;['a', 'b', 'c'].forEach(mockFn)
		expect(mockFn).toHaveBeenCalledTimes(3)
		// pierwszy parametr przy pierwszym wywołaniu
		expect(mockFn.mock.calls[0][0]).toBe('a')
		// drugi parametr przy pierwszym wywołaniu
		expect(mockFn.mock.calls[0][1]).toBe(0)
		// pierwsza zwrócona wartość
		expect(mockFn.mock.results[0].value).toBe(undefined)
	})
})
