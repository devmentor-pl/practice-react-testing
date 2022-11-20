/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { getMd5 } from "./../providers/md5Provider"
import Md5Form from "./../components/Md5Form"

jest.spyOn(window, "fetch")

describe("get", () => {
  test("should render input on the page", function () {
    render(<Md5Form getMd5={getMd5} />)

    const inputElement = screen.getByLabelText("")

    expect(inputElement).toBeInTheDocument()
  })

  test("return ok if text is provider to data.text", async function () {
    render(<Md5Form getMd5={getMd5} />)
    const testText = "Test"
    const inputElement = screen.getByLabelText("")
    userEvent.type(inputElement, testText)
    const displayedText = await screen.findByText(testText)

    expect(displayedText).toBeInTheDocument()
  })

  test("should fetch data from api when send request", async function () {
    const { container } = render(<Md5Form getMd5={getMd5} />)

    const mockedValue = "5b0a5d2c55a629658cfdcdcc3d4d117b"
    const inputElement = screen.getByLabelText("")
    const buttonElement = screen.getByRole("button", { name: /send/i })
    const strongElement = container.querySelector(".data-md5")

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { Digest: mockedValue }
      },
    })

    userEvent.type(inputElement, "test")
    userEvent.click(buttonElement)

    await waitFor(() => {
      expect(strongElement).toBeInTheDocument()
      expect(strongElement.textContent).toBe(mockedValue)
    })
  })
})
