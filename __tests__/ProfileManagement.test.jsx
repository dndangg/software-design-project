import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileManagement from "../src/pages/profileManagement"; 
import '@testing-library/jest-dom/extend-expect';

// Mock fetch to simulate API requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ profile: {} }),
  })
);

describe("ProfileManagement Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render the profile management form", () => {
    render(<ProfileManagement />);

    // Check if form fields are rendered
    expect(screen.getByLabelText(/Full Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Skills \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 1 \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/City \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/State \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Dates \*/)).toBeInTheDocument();
  });

  it("should handle form submission with valid data", async () => {
    render(<ProfileManagement />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name \*/), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Select Skills \*/), { target: { value: "coding" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1 \*/), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City \*/), { target: { value: "Austin" } });
    fireEvent.change(screen.getByLabelText(/State \*/), { target: { value: "TX" } });
    fireEvent.change(screen.getByLabelText(/Zip \*/), { target: { value: "73301" } });
    fireEvent.change(screen.getByLabelText(/Select Dates \*/), { target: { value: "2025-03-07" } });

    // Mock successful form submission
    fireEvent.click(screen.getByText(/Save Profile/));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if the correct API call was made
    expect(fetch).toHaveBeenCalledWith(
      "/api/profile",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "hardcoded-token",
        },
        body: JSON.stringify({
          fullName: "John Doe",
          skills: "coding",
          address1: "123 Main St",
          city: "Austin",
          state: "TX",
          zip: "73301",
          date: "2025-03-07",
        }),
      })
    );
  });

  it("should display validation errors if required fields are empty", async () => {
    render(<ProfileManagement />);

    // Leave all fields empty and submit the form
    fireEvent.click(screen.getByText(/Save Profile/));

    await waitFor(() => {
      // Check for the validation error messages
      expect(screen.getByText(/Full Name is required/)).toBeInTheDocument();
      expect(screen.getByText(/Skills are required/)).toBeInTheDocument();
      expect(screen.getByText(/Address Line 1 is required/)).toBeInTheDocument();
      expect(screen.getByText(/City is required/)).toBeInTheDocument();
      expect(screen.getByText(/State is required/)).toBeInTheDocument();
      expect(screen.getByText(/Zip is required/)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/)).toBeInTheDocument();
    });
  });

  it("should show an alert message when profile update fails", async () => {
    // Simulate API failure
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to update profile" }),
      })
    );

    render(<ProfileManagement />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/Full Name \*/), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Select Skills \*/), { target: { value: "design" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1 \*/), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City \*/), { target: { value: "Austin" } });
    fireEvent.change(screen.getByLabelText(/State \*/), { target: { value: "TX" } });
    fireEvent.change(screen.getByLabelText(/Zip \*/), { target: { value: "73301" } });
    fireEvent.change(screen.getByLabelText(/Select Dates \*/), { target: { value: "2025-03-07" } });

    // Submit the form
    fireEvent.click(screen.getByText(/Save Profile/));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if alert is shown
    expect(window.alert).toHaveBeenCalledWith("Failed to update profile");
  });

  it("should show an error alert if an exception occurs during profile update", async () => {
    // Simulate an error occurring during fetch
    fetch.mockImplementationOnce(() => Promise.reject(new Error("Network Error")));

    render(<ProfileManagement />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/Full Name \*/), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Select Skills \*/), { target: { value: "marketing" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1 \*/), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByLabelText(/City \*/), { target: { value: "Austin" } });
    fireEvent.change(screen.getByLabelText(/State \*/), { target: { value: "TX" } });
    fireEvent.change(screen.getByLabelText(/Zip \*/), { target: { value: "73301" } });
    fireEvent.change(screen.getByLabelText(/Select Dates \*/), { target: { value: "2025-03-07" } });

    // Submit the form
    fireEvent.click(screen.getByText(/Save Profile/));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if alert is shown
    expect(window.alert).toHaveBeenCalledWith("An error occurred while updating the profile");
  });
});
