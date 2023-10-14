import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import CatchError from "./CatchError";

describe('LoginForm', () => {
  it('should check is label exists', () => {
    render(<LoginForm />)

    const label = screen.getByLabelText(/login/i)
    expect(label).toBeInTheDocument()
  })

  it('should check if the login input exists', () => {
    render(<LoginForm />);

    const loginInput = screen.getByRole('textbox', { name: /login/i });
    expect(loginInput).toBeInTheDocument()
  });

  it('should show error when value is too short', async () => {
    render(<LoginForm />);

    const loginInput = await screen.findByRole('textbox', { name: /login/i });

    userEvent.type(loginInput, 'abc')

    const error = await screen.findByText('The field is too short!')

    expect(error).toBeInTheDocument()
  });

  it('should not show error when value has right length', async () => {
    render(<LoginForm />);

    const loginInput = await screen.findByRole('textbox', { name: /login/i });

    userEvent.type(loginInput, 'abcd')

    const error = screen.queryByText('The field is too short!')

    expect(error).toBeNull()
  });

  it('should check sending wrong data #1', async () => {
    const mock = jest.fn()
    mock.mockReturnValueOnce(false)

    render(
      <CatchError>
        <LoginForm tryAuth={mock} />
      </CatchError>
    );

    const button = await screen.findByRole('button')
    userEvent.click(button)

    const error = await screen.findByText('Invalid form')

    expect(error).toBeInTheDocument()
  });

  // it('should check sending wrong data #2', async () => {
  //   expect.assertions(1)

  //   const mock = jest.fn()
  //   mock.mockReturnValueOnce(false)

  //   render(
  //     <LoginForm tryAuth={mock} />
  //   );

  //   const button = await screen.findByRole('button')
  //   try {
  //     userEvent.click(button)
  //   } catch (error) {
  //     // eslint-disable-next-line jest/no-conditional-expect
  //     expect(error.message).toBe('Incorrect data!')
  //   }
  // });

  // it('should check sending property data', async () => {
  //   render(
  //     <CatchError>
  //       <LoginForm tryAuth={tryAuthMock} />
  //     </CatchError>
  //   );

  //   const loginInput = screen.getByRole('textbox', { name: /login/i });
  //   userEvent.type(loginInput, 'abcd')

  //   const password = screen.getByRole('textbox', { name: /password/i });
  //   userEvent.type(password, 'abcd')

  //   const sendButton = screen.getByRole('button', { name: /send/i });
  //   userEvent.click(sendButton)

  //   expect(screen.queryByText('Invalid form')).not.toBeInTheDocument();
  // });
})