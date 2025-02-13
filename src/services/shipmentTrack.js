export const trackOrder = async (orderId) => {
  if (!orderId) {
    console.error("❌ Error: orderId is missing!");
    return null;
  }

  try {
    const response = await fetch(
      `https://barq-backend.onrender.com/track/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Tracking data:", data);
    return data;
  } catch (error) {
    console.error("Failed to track order:", error.message);
    return null;
  }
};
