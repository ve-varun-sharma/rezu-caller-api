import { summarizeCall, parseTrancript } from "../helpers/openai.helpers";
import { getCallData } from "../helpers/blandAi.helpers";
import { sendSMS } from "../helpers/twilio.helpers";

export async function rezuDemoInbound(body: any) {
  console.log("Inbound call Received!");
  if (typeof body === "object") {
    const call_id = body?.call_id;
    if (!call_id) {
      console.log("No Call ID");
      return {
        success: false,
        error: "Invalid request body - missing call_id",
      };
    }

    const transcript = body?.transcript;
    if (!transcript) {
      console.log("No transcript");

      return {
        success: false,
        error: "Invalid request body - missing transcript",
      };
    }

    console.log(body);

    const summarizedCall = await summarizeCall(transcript);

    function checkStringForApology(str: string): boolean {
      const regex = /I'm sorry/i;
      return !regex.test(str);
    }

    checkStringForApology("hello there");

    const validatedSummmarization = checkStringForApology(summarizedCall);
    if (!validatedSummmarization) {
      console.log(validatedSummmarization);
      console.log("Failed to summarize the transcript");

      return { success: false, error: "Could not summarize the call" };
    }
    const parsedTranscript = await parseTrancript(summarizedCall);

    const callData = await getCallData(call_id);
    const userNumber = callData?.from as string;

    const message = `Hey, ${parsedTranscript.fullName} thanks for making a reservation with the Flying Pig! 🐷
    We look forward to seeing you at ${parsedTranscript.reservationDate}  for your party 🎉 of ${parsedTranscript.guests}`;
    console.log("Creating booking");

    sendSMS(message, userNumber);

    console.log("Done");

    return { success: true };
  } else {
    console.error("Failed");
    return { success: false, error: "Invalid request body" };
  }
}
