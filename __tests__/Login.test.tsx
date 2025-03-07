import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/pages/login"; 
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Login Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("renders login form correctly", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("displays error message on failed login", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
    
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    
    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  test("redirects on successful login", async () => {
    delete window.location;
    window.location = { href: "" };
    
    fetchMock.mockResponseOnce(JSON.stringify({ user: { email: "test@example.com" } }), { status: 200 });
    
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "correctpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    
    await screen.findByText("Login successful!");
    expect(window.location.href).toBe("/successfulLogin");
  });
});
