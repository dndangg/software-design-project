import { render, screen, waitFor } from "@testing-library/react";
import VolunteerHistory from "../src/pages/volunteerHistory";
import { rest } from 'msw;
import { setupServer } from "msw/node";

// Mock API server
const server = setupServer(
  rest.get("/api/volunteerHistory", (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: [
        {
          id: 1,
          volunteerName: "John Doe",
          participationStatus: "Completed",
          eventName: "Community Cleanup",
          eventDescription: "Cleaning local parks",
          location: "Houston, TX",
          requiredSkills: ["Teamwork", "Physical Stamina"],
          urgency: "Medium",
          eventDate: "2024-03-15",
        },
      ],
    }));
  })
);

// Enable API mocking before tests and clean up after
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders loading state initially", () => {
  render(<VolunteerHistory />);
  expect(screen.getByText(/loading volunteer history/i)).toBeInTheDocument();
});

test("renders volunteer history after fetching data", async () => {
  render(<VolunteerHistory />);
  await waitFor(() => screen.getByText("John Doe"));
  expect(screen.getByText("Community Cleanup")).toBeInTheDocument();
  expect(screen.getByText("Houston, TX")).toBeInTheDocument();
});

test("handles API error correctly", async () => {
  server.use(
    rest.get("/api/volunteerHistory", (req, res, ctx) => {
      return res(ctx.json({ success: false, message: "Error fetching data" }));
    })
  );
  render(<VolunteerHistory />);
  await waitFor(() => screen.getByText("Error fetching data"));
  expect(screen.getByText("Error fetching data")).toBeInTheDocument();
});
