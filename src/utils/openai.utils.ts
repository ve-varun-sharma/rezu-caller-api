import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const openai = new OpenAI(OPENAI_API_KEY as string);
