import { render, screen } from '@testing-library/react';
import Credit from './Credit';

const setup = () => {
    const credit = render(<Credit />);
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    return {
		...credit,
		submitBtn,
	};
};

describe('<Credit />', () => {
    test('should render field for credit card number', () => {
        const { submitBtn } = setup();
        expect(submitBtn).toBeInTheDocument();
    });
    
    // test('should identiy and display VISA', () => {
    //     setup();
    // });
    
    
});
