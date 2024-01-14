import { openai } from "../utils/openai.utils";

interface TranscriptBlock {
  id: number;
  created_at: string;
  text: string;
  user: string;
  c_id: string;
}

export interface ParsedTranscript {
  reservationDate: string;
  fullName: string;
  guests: string;
}
export async function summarizeCall(
  content: TranscriptBlock[]
): Promise<string> {
  console.log("starting");

  try {
    // Format the transcript into a readable dialogue
    const dialogue = content
      .map((entry) => `${entry.user}: ${entry.text}`)
      .join("\n");

    // Prepare the prompt for GPT
    const prompt = `Summarize all the appointment/reservation information. Parse the specific start time, end time, the number of guests for the reservation and the full name of the participant from the included transcript. If you cannot summarize the transcript due to missing information say: Cannot summarize transcript' Transcript:\n\n${dialogue} \n\nI`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output text.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "text" },
    });
    const response = completion.choices[0].message.content;
    console.log(response);

    return response as string;
  } catch (error) {
    throw "Could not summarized transcript";
  }
}

export async function parseTrancript(
  textInput: string
): Promise<ParsedTranscript> {
  // Prepare the prompt for GPT
  const prompt = `
  We're going to parse a phone call transcript and return the reservation date, full name of the caller, and the number of guests. Here is the transcript ${textInput}. 
  
  1. For the reservationDate property in the json response, return the end time of the reservation. Only return the exact end time and date. No other text. ONLY THE TIME AND DATE: Note: if no end time exists, return ONLY THE START TIME AND DATE plus one hour.:
  2. For the fullName property in the response Parse any full names found in the transcript in comma separated format. Make sure to format the full name correctly. 
  E.g: {FirstName}{LastName} or Brian Johnson. ONLY RETURN THE FULL NAME. NO OTHER TEXT.

  3. For the number of guests as the guests propert in the returned json response Parse the number of guests for the reservation or the number of people joining the party in this transcript. Make sure to format the number as just a single number.
  E.g: 2. ONLY RETURN THE NUMBER. NO OTHER TEXT.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output json.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    console.log(response);

    return response;
  } catch (error) {
    throw "Could not parseTrancript";
  }
}
