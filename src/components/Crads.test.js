import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import Cards from './Cards'

describe('Test Cards component', () => {
    it('should be true', () => {
        expect(true).toBe(true)
    })
    it('should check if input is in the component', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        expect(input).toBeInTheDocument()
    })
    it('should check if button is in the component', () => {
        render(<Cards />)
        const button = screen.getByText('check')
        expect(button).toBeInTheDocument()
    })
    it('should check if number credit card was given in input', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        fireEvent.change(input, {target: {value: '5575373225509616'}})
        expect(input.value).toBe('5575373225509616')
    })
    it('should check number credit card - MasterCard after click button', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        fireEvent.change(input, {target: {value: '5575373225509616'}})
        const button = screen.getByText('check')
        fireEvent.click(button)
        const MasterCard = screen.getByText('MasterCard')
        expect(MasterCard).toHaveTextContent('MasterCard')
    })
    it('should check number credit card - Visa after click button', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        fireEvent.change(input, {target: {value: '4213523283653018'}})
        const button = screen.getByText('check')
        fireEvent.click(button)
        const Visa = screen.getByText('VISA')
        expect(Visa).toHaveTextContent('VISA')
    })
    it('should check wrong number credit card after click button', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        fireEvent.change(input, {target: {value: '4213523283653011'}})
        const button = screen.getByText('check')
        fireEvent.click(button)
        const textError = screen.getByText('Niepoprawna karta')
        expect(textError).toHaveTextContent('Niepoprawna karta')
    })
    it('should check number credit card too small after click button 2', () => {
        const {container} = render(<Cards />)
        const input = container.querySelector('input')
        fireEvent.change(input, {target: {value: '4213523283'}})
        const button = screen.getByText('check')
        fireEvent.click(button)
        const textError = screen.getByText('Niepoprawna karta')
        expect(textError.textContent).toBe('Niepoprawna karta')
    })
})



















