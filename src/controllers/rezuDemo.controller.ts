import { summarizeCall, parseTrancript } from "../helpers/openai.helpers";
import { getCallData } from "../helpers/blandAi.helpers";
import { sendSMS } from "../helpers/twilio.helpers";
import { createDemoCallDocument } from "../helpers/firestore.helpers";
export async function rezuDemoInbound(body: any) {
  console.log("Inbound call Received!");

  try {
    const callId = body?.call_id;
    if (!callId) {
      console.log("No call_id");
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

    const summarizedCall = await summarizeCall(transcript);

    function checkStringForApology(str: string): boolean {
      const regex =
        /I cannot summarize the transcript due to missing information./i;
      return !regex.test(str);
    }

    const validatedSummmarization = checkStringForApology(summarizedCall);
    if (!validatedSummmarization) {
      console.log(validatedSummmarization);
      console.log("Failed to summarize the transcript");

      return { success: false, error: "Could not summarize the call" };
    }

    console.log("Valid Summarization");
    const parsedTranscript = await parseTrancript(summarizedCall);
    console.log("parsedTranscript");
    console.log(parsedTranscript);

    console.log("Getting call data via Bland.AI");
    console.log(callId);
    const callData = await getCallData(callId);
    console.log("callData");
    const userNumber = callData?.from as string;

    const message = `Hey, ${
      parsedTranscript.fullName ? parsedTranscript.fullName : "there"
    } thanks for making a reservation with the Flying Pig! 🐷
    We look forward to seeing you at ${
      parsedTranscript.reservationDate
        ? parsedTranscript.reservationDate
        : "Februrary 5th, at 7 PM"
    }  for your party 🎉 of ${
      parsedTranscript.guests ? parsedTranscript.guests : 2
    }`;

    console.log(message);
    await sendSMS(message, userNumber);

    const demoCallDocumentData = {
      callId: callData.c_id,
      toNumber: callData.to,
      fromNumber: callData.from,
      completed: callData.completed,
      created_at: callData.created_at,
      inbound: callData.inbound,
      concatenated_transcript: callData.concatenated_transcript,
    };
    await createDemoCallDocument(demoCallDocumentData);

    function wait() {
      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve("Waited for 2 seconds");
          const rezuDemoMessage = `Enjoyed our demo? Elevate 🚀 your restaurant with Rezu! Click https://rezu.softr.app for seamless reservations.  📲 Say goodbye to missed opportunities!`;
          await sendSMS(rezuDemoMessage, userNumber);
        }, 7000); // 2000 milliseconds = 2 seconds
      });
    }
    wait();

    console.log("Done");
    return { success: true };
  } catch (error) {
    return { success: false, error: `Invalid request body. Error: ${error}` };
  } finally {
  }
}
