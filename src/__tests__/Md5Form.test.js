import Md5Form from "../components/Md5Form";
import { getMd5 } from '../providers/md5Provider'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, 'fetch')

const setup = () => {
 return render(<Md5Form getMd5={getMd5} />)
}

describe('Md5 form', () => {

  it('should have an input element', () => {
    setup()
    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('should input value appears in .data-text element', async () => {
    setup()    
    const input = document.querySelector('input')
    userEvent.type(input, 'testing')
    const textFromInput = await screen.findByText('testing')
    const dataTextElement = document.querySelector('.data-text')
    expect(textFromInput).toBeInTheDocument()
    expect(dataTextElement.textContent).toBe('testing')
  })
  
  it('should render fetched data in .data-md5 element after submit', async () => {
    setup()
    const input = document.querySelector('input')
    const data = '098f6bcd4621d373cade4e832627b4f6'
    const submitButton = screen.getByRole(/button/i, {name: /send/i })
    const dataMd5Element = document.querySelector('.data-md5')

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { Digest: data }
      }
    })

    userEvent.type(input, 'test')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(dataMd5Element).toBeInTheDocument()
      expect(dataMd5Element.textContent).toBe(data)
    })
  })

  it('should clear text in .data-md5 element after changing input value', async () => {
    setup()
    const input = document.querySelector('input')
    const data = '098f6bcd4621d373cade4e832627b4f6'
    const submitButton = screen.getByRole(/button/i, {name: /send/i })
    const dataMd5Element = document.querySelector('.data-md5')

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { Digest: data }
      }
    })

    userEvent.type(input, 'test')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(dataMd5Element).toBeInTheDocument()
      expect(dataMd5Element.textContent).toBe(data)
    })
    
    userEvent.type(input, 'again')
    expect(dataMd5Element.textContent).toBe('')
  })
})