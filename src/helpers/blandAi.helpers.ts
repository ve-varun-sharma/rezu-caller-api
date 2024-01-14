import axios from "axios";
import { BlandAICallData } from "../types/types";

export async function getCallData(callId: string): Promise<BlandAICallData> {
  const url = `https://api.bland.ai/v1/calls/${callId}`;
  const headers = {
    authorization: process.env.BLANDAI_KEY,
  };

  try {
    const response = await axios.get(url, { headers });

    if (response.data.status === "error") {
      throw "Could not fetch call meta data";
    }

    const callData = response.data;
    console.log("Fetched call data");
    return callData;
  } catch (error) {
    // Handle error
    throw error;
  }
}
