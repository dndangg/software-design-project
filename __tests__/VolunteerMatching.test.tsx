import { render, screen, fireEvent } from '@testing-library/react';
import VolunteerMatching from '../src/pages/volunteerMatching'; // Adjust path if needed
import '@testing-library/jest-dom/extend-expect';

describe('VolunteerMatching', () => {
  test('renders Volunteer Matching component', () => {
    render(<VolunteerMatching />);

    // Check if the necessary elements are rendered
    expect(screen.getByText('Volunteer Matching')).toBeInTheDocument();
    expect(screen.getByLabelText('Volunteer Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Matched Event')).toBeInTheDocument();
    expect(screen.getByText('Match!')).toBeInTheDocument();
  });

  //verify inputs work properly
  test('input updates volunteer name state correctly', () => {
    render(<VolunteerMatching />);

    const volunteerNameInput = screen.getByLabelText('Volunteer Name');
    
    fireEvent.change(volunteerNameInput, { target: { value: 'John Doe' } });

    expect(volunteerNameInput).toHaveValue('John Doe');
  });

  // verify match functionality
  test('matched event state is updated when match button is clicked', () => {
    render(<VolunteerMatching />);

    // verify all elements appear on screen
    const volunteerNameInput = screen.getByLabelText('Volunteer Name');
    const matchButton = screen.getByText('Match!');
    const matchedEventInput = screen.getByLabelText('Matched Event');
    
    // Initially, matched event should be empty
    expect(matchedEventInput).toHaveValue('');

    // Simulate user input for volunteer name
    fireEvent.change(volunteerNameInput, { target: { value: 'John Doe' } });

    // Click the match button
    fireEvent.click(matchButton);

    // After the button click, matched event should be updated
    expect(matchedEventInput).toHaveValue('Blood Drive');
  });

  // verify error handling if empty required fields
  test('does not update matched event if no volunteer name is entered', () => {
    render(<VolunteerMatching />);

    const matchButton = screen.getByText('Match!');
    const matchedEventInput = screen.getByLabelText('Matched Event');
    
    // Initially, matched event should be empty
    expect(matchedEventInput).toHaveValue('');

    // Click the match button without entering a volunteer name
    fireEvent.click(matchButton);

    // Matched event should still be empty
    expect(matchedEventInput).toHaveValue('');
  });
});
