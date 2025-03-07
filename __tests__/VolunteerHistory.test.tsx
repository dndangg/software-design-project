// __tests__/VolunteerHistory.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import VolunteerHistory from "../src/pages/volunteerHistory";
import fetchMock from "jest-fetch-mock";

// Mock the fetch API
fetchMock.enableMocks();

describe("VolunteerHistory", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("renders loading state initially", () => {
    render(<VolunteerHistory />);
    expect(screen.getByText(/Loading volunteer history.../i)).toBeInTheDocument();
  });

  test("displays error message if API request fails", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch volunteer history"));

    render(<VolunteerHistory />);

    await waitFor(() => expect(screen.getByText(/Failed to fetch volunteer history./i)).toBeInTheDocument());
  });

  test("displays volunteer history table when data is successfully fetched", async () => {
    const mockData = {
      success: true,
      data: [
        {
          id: 1,
          volunteerName: "John Doe",
          participationStatus: "Completed",
          eventName: "Community Cleanup",
          eventDescription: "Cleaning up the local park",
          location: "Local Park",
          requiredSkills: ["Leadership", "Organization"],
          urgency: "High",
          eventDate: "2025-04-01",
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(<VolunteerHistory />);

    await waitFor(() => expect(screen.getByText(/Community Cleanup/i)).toBeInTheDocument());
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  test("displays no volunteer history found message if no data is returned", async () => {
    const mockData = { success: true, data: [] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(<VolunteerHistory />);

    await waitFor(() => expect(screen.getByText(/No volunteer history found./i)).toBeInTheDocument());
  });
});
