export const trackOrder = async (orderId) => {
  const url = `https://rest.fizzpa.net/api/Tracking/${orderId}`;
  const apiKey = "j8543k8W6lAynA0up2ajayqhYtXCW2Ub";
  const REFERER = "https://baraq-alsahab.vercel.app/";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: apiKey, // No "Bearer", since Postman worked without it
        Referer: REFERER, // Ensure correct capitalization
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `خطأ في الطلب: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("بيانات التتبع:", data);
    return data;
  } catch (error) {
    console.error("فشل تتبع الطلب:", error.message);
    return null;
  }
};
