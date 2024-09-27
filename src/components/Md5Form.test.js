import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Md5Form from "./Md5Form";
import { getMd5 } from "../providers/md5Provider"

describe('Md5Form', () => {
  it('should display inserted text to input with class .data-text', async () => {
    render(<Md5Form />)

    const input = await screen.findByRole('textbox')
    userEvent.type(input, 'abcd')

    const typedText = await screen.findByText(/abcd/i)

    expect(typedText).toBeInTheDocument()
  })

  it('should load data to data-md5', async () => {
    const spy = jest.spyOn(window, 'fetch')

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return {
          Digest: '202cb962ac59075b964b07152d234b70'
        }
      }
    })
    render(<Md5Form getMd5={getMd5} />)

    const input = await screen.findByRole('textbox')
    userEvent.type(input, '123')

    const button = await screen.findByRole('button')
    userEvent.click(button)

    await waitFor(async () => {
      const password = await screen.findByText(/202cb962ac59075b964b07152d234b70/i)

      expect(password).toBeInTheDocument()
    })

    spy.mockClear()
  })

  it('should clear md5', async () => {
    const spy = jest.spyOn(window, 'fetch')

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return {
          Digest: '202cb962ac59075b964b07152d234b70'
        }
      }
    })
    render(<Md5Form getMd5={getMd5} />)

    const input = await screen.findByRole('textbox')
    userEvent.type(input, '123')

    const button = await screen.findByRole('button')
    userEvent.click(button)

    await waitFor(async () => {
      const password = await screen.findByText(/202cb962ac59075b964b07152d234b70/i)

      expect(password).toBeInTheDocument()

      userEvent.type(input, 'a')

      await waitFor(() => {
        const password = screen.queryByText(/202cb962ac59075b964b07152d234b70/i)

        expect(password).not.toBeInTheDocument()
      })
    })
    spy.mockClear()
  })
})