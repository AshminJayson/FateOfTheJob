import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: process.env.CHATGPT_ORGANIZATION,
    apiKey: process.env.CHATGPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    let message = "";
    let gptReply = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
    });
    return NextResponse.json({ message: gptReply });
}
