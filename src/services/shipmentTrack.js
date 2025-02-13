export const trackOrder = async (orderId) => {
  if (!orderId) {
    console.error("❌ Error: orderId is missing!");
    return null;
  }

  // Use environment variable for the API key
  const apiKey = import.meta.env.VITE_API_KEY;

  // Check if the API key is defined
  if (!apiKey) {
    console.error("❌ Error: API key is missing! Ensure the following:");
    console.error("1. The .env file is in the root of your project.");
    console.error(
      "2. The variable is prefixed with VITE_ (e.g., VITE_API_KEY)."
    );
    console.error(
      "3. You have restarted the development server after adding the .env file."
    );
    return null;
  }

  try {
    // Use a CORS proxy to bypass CORS restrictions
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy
    const apiUrl = `https://rest.fizzpa.net/api/Tracking/${orderId}`; // Original API URL

    const response = await fetch(proxyUrl + apiUrl, {
      method: "GET",
      headers: {
        Authorization: apiKey, // Pass the API key directly
        "Content-Type": "application/json",
        Referer: "https://baraq-alsahab.vercel.app/", // Keep if required by the API
      },
    });

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
