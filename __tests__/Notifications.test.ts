import { createMocks } from "node-mocks-http";
import getHandler from "../src/pages/api/notifications/get";
import sendHandler from "../src/pages/api/notifications/send";
import { notifications } from "../src/pages/api/notifications/notificationsStore";

describe("Notifications API", () => {
  // Clear the notifications array before each test
  beforeEach(() => {
    notifications.length = 0;
  });

  test("GET returns 'No notifications available' when empty", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await getHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe("No notifications available.");
  });

  test("POST sends a notification and GET returns it", async () => {
    // Define the test notification data
    const postData = {
      volunteerEmail: "test@example.com",
      message: "This is a test notification.",
    };

    // Send a POST request to add a notification
    const { req: postReq, res: postRes } = createMocks({
      method: "POST",
      body: postData,
    });

    await sendHandler(postReq, postRes);

    expect(postRes._getStatusCode()).toBe(201);
    const postResponse = JSON.parse(postRes._getData());
    expect(postResponse.notification).toHaveProperty("id");
    expect(postResponse.notification.volunteerEmail).toBe(postData.volunteerEmail);

    // Now, test the GET endpoint to ensure it returns the newly added notification
    const { req: getReq, res: getRes } = createMocks({
      method: "GET",
    });

    await getHandler(getReq, getRes);
    expect(getRes._getStatusCode()).toBe(200);
    const getResponse = JSON.parse(getRes._getData());
    expect(getResponse.notifications).toHaveLength(1);
    expect(getResponse.notifications[0].volunteerEmail).toBe(postData.volunteerEmail);
  });
});