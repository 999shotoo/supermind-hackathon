import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, chatId } = await req.json();
    console.log("Received request:", { message, chatId });

    // Validate input
    if (!message || !chatId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const apiUrl = process.env.LANGFLOW_API_URL;
    const apiKey = process.env.LANGFLOW_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: "API configuration missing" },
        { status: 500 }
      );
    }

    // Prepare the request body
    const requestBody = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-GZx5K": {},
        "ChatOutput-gPkNh": {},
        "Agent-T8fIY": {},
        "Prompt-xBIRN": {},
        "AstraDB-Eqgxi": {},
        "ParseData-ZA9oM": {},
        "File-soIAy": {},
        "AstraDB-LdUYD": {},
        "SplitText-YojhN": {},
        "NVIDIAEmbeddingsComponent-ROpt8": {},
        "NVIDIAEmbeddingsComponent-pSKAR": {},
      },
    };

    // Make the API call using fetch
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is ok
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: response.status }
      );
    }

    // Return the response from the Langflow API
    const data = await response.json();
    const generatedMessage = data.outputs[0].outputs[0].results.message.text;

    return NextResponse.json({ message: generatedMessage }, { status: 200 });
  } catch (error) {
    console.error("Error calling Langflow API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
