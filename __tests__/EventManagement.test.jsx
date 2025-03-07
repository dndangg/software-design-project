import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventManagement from "../src/pages/eventManagement"; 

describe("EventManagement Component", () => {
  it("renders the form and allows users to fill out fields", () => {
    render(<EventManagement />);

    // Check if form fields are rendered
    expect(screen.getByLabelText(/Event Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Required Skills/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Urgency/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Date/)).toBeInTheDocument();
  });

  //form field input validations
  it("validates required fields and shows errors if form is submitted with missing data", async () => {
    render(<EventManagement />);

    const submitButton = screen.getByText(/Create Event/);

    // Simulate submitting the form without filling out the fields
    fireEvent.click(submitButton);

    // Check if error messages appear
    await waitFor(() => {
      expect(screen.getByText("Event Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Location is required")).toBeInTheDocument();
      expect(screen.getByText("Required skills are needed")).toBeInTheDocument();
      expect(screen.getByText("Urgency level is required")).toBeInTheDocument();
      expect(screen.getByText("Event date is required")).toBeInTheDocument();
    });
  });

  //make sure form fields update after input 
  it("updates form data when input fields change", () => {
    render(<EventManagement />);

    const eventNameInput = screen.getByLabelText(/Event Name/);
    fireEvent.change(eventNameInput, { target: { value: "Sample Event" } });
    expect(eventNameInput.value).toBe("Sample Event");

    const eventDescriptionInput = screen.getByLabelText(/Event Description/);
    fireEvent.change(eventDescriptionInput, { target: { value: "Event description" } });
    expect(eventDescriptionInput.value).toBe("Event description");
  });

  //make sure submit works properly
  it("submits form successfully and resets data", async () => {
    // Mock the API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Event created successfully!" }),
      })
    );

    render(<EventManagement />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/Event Name/), { target: { value: "Sample Event" } });
    fireEvent.change(screen.getByLabelText(/Event Description/), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/Location/), { target: { value: "Sample Location" } });
    fireEvent.change(screen.getByLabelText(/Required Skills/), { target: { value: "Skill 1" } });
    fireEvent.change(screen.getByLabelText(/Urgency/), { target: { value: "medium" } });
    fireEvent.change(screen.getByLabelText(/Event Date/), { target: { value: "2025-03-01" } });

    const submitButton = screen.getByText(/Create Event/);
    fireEvent.click(submitButton);

    // Wait for success response and check if alert is called
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Reset check after submit
    await waitFor(() => {
      expect(screen.getByLabelText(/Event Name/).value).toBe("");
      expect(screen.getByLabelText(/Event Description/).value).toBe("");
      expect(screen.getByLabelText(/Location/).value).toBe("");
      expect(screen.getByLabelText(/Required Skills/).value).toBe("");
      expect(screen.getByLabelText(/Urgency/).value).toBe("");
      expect(screen.getByLabelText(/Event Date/).value).toBe("");
    });
  });

  //make sure loading message displays upon submission
  it("displays loading state when submitting the form", () => {
    render(<EventManagement />);

    const submitButton = screen.getByText(/Create Event/);
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Saving...");
  });
});
