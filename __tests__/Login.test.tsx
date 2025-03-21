import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/pages/login"; 

//mock simulation for testing
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

//ensure page renders properly
describe("Login Component", () => {
  it("should render the login form correctly", () => {
    render(<Login />);

    // Check if the form fields are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  //verify user input handling
  it("should handle user input correctly", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user typing into the email and password fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if the input values have been updated correctly
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  //verify error message if login failed
  it("should display error message if login fails", async () => {
    // Mocking the fetch request to simulate a failed login
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ error: "Invalid credentials" }),
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check for error message after the failed login attempt
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  // verify successful login messages display
  it("should display success message and redirect upon successful login", async () => {
    // Mocking the fetch request to simulate a successful login
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ user: { name: "Test User" } }),
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check for success message
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
    });
  });
});
