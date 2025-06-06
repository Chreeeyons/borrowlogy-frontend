const BASE_URL = "http://127.0.0.1:8000/user/user";

export const addUser = async (UserData: {
  name: string;
  email: string;
  username: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/create_borrower/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // read full response error body
      console.error("Server responded with error:", response.status, errorText);
      throw new Error("Failed to add to cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding equipment:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/userget/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }); // Assuming user_id is 1 for demo purposes
    if (!response.ok) throw new Error("Failed to fetch equipment");
    return await response.json();
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
};
