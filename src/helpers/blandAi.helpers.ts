import axios from "axios";
import { BlandAICallData } from "../types/types";

export async function getCallData(callId: string): Promise<BlandAICallData> {
  const url = `https://api.bland.ai/v1/calls/${callId}`;
  const headers = {
    Authorization: process.env.BLANDAI_KEY,
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
    // Handle response data

    const callId = response.data;

    return callId;
  } catch (error) {
    // Handle error
    throw error;
  }
}
