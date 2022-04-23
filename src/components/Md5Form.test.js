import { render, screen } from '@testing-library/react';
import { getMd5 } from '../providers/md5Provider';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';

jest.spyOn(window, 'fetch');

describe('<Md5Form>', () => {
  it('check if input exists', () => {
    render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByLabelText('');

    expect(input).toBeInTheDocument();
  });

  //   Mateusz, tutaj coś pojawia mi się problem, bo kompletnie nie odczytuje mi tekstu wpisanego w input. W efekcie otrzymuję pusty string, zamiast tego co wpisałem w userEvent. Bez tego nie mogę ruszyć z pozostałymi rzeczami. Z góry dzięki za pomoc!

  it('check if input value updates span', () => {
    const { container } = render(<Md5Form getMd5={getMd5} />);

    const input = screen.getByLabelText('');
    userEvent.type(input, 'example');

    const span = container.querySelector('.data-text');
    expect(span.textContent).toBe('example');
  });
});
