import twilio from "twilio";

// Twilio credentials
const accountSid = process.env.TWILIO_SID_KEY;
const authToken = process.env.TWILIO_API_KEY;
const twilioNumber = "+16043301679";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send an SMS
export async function sendSMS(content: string, toNumber: string) {
  console.log("Sending text");
  try {
    const message = await client.messages.create({
      body: "Hello from Twilio!",
      from: twilioNumber,
      to: toNumber,
    });

    console.log(`Message sent successfully: ${message}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}
