import { fireEvent, render, screen } from "@testing-library/react"
import LoginForm from "../components/LoginForm"

describe("LoginForm component", () => {
    it('calls tryAuth when form is submitted successfully', () => {
        const mockTryAuth = jest.fn().mockReturnValue(true);

        render(<LoginForm tryAuth={mockTryAuth}/>);

        const submitButton = screen.getByRole('button', {name: 'send'});

        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
        
        expect(mockTryAuth).toHaveBeenCalled();
    })

    it('throws an error when tryAuth returns false on submit',  () => {
        const mockTryAuth = jest.fn().mockReturnValue(false);

        render(<LoginForm tryAuth={mockTryAuth}/>);

        const submitButton = screen.getByRole('button', {name: 'send'});
        expect(submitButton).toBeInTheDocument();

    
        expect(() => fireEvent.click(submitButton)).toThrow('Incorrect data!');
    })

})