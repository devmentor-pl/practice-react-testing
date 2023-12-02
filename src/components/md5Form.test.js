import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Md5Form from './Md5Form';

describe('Md5Form', () => {
	it('should update state when text is typed into the input', async () => {
		render(<Md5Form getMd5={jest.fn()} />);

		// Pobierz pole wejściowe
		const inputElement = screen.getByRole('textbox');

		// Wprowadź tekst do pola wejściowego
		fireEvent.change(inputElement, { target: { value: 'example' } });

		// Sprawdź, czy stan komponentu został zaktualizowany
		expect(screen.getByText(/example/)).toBeInTheDocument();
		expect(screen.queryByText(/md5-result/)).toBeNull(); // Sprawdź, czy nie ma wyniku md5

		// Możesz również sprawdzić, czy stan komponentu jest zgodny z oczekiwaniami, na przykład:
		// expect(component.state().text).toBe('example');
		// expect(component.state().md5).toBe('');

		// Inne testy związane z interakcją użytkownika możesz dodać tutaj
	});
});
