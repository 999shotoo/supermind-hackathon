// app/api/langflow/route.ts

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Validate input
    if (!message) {
      return Response.json({ error: "No message provided" }, { status: 400 });
    }

    const apiUrl = process.env.LANGFLOW_API_URL;
    const apiKey = process.env.LANGFLOW_API_KEY;

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
    const response = await fetch(apiUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        { message: "Something went wrong contact the developer" },
        { status: response.status }
      );
    }

    // Return the response from the Langflow API
    const data = await response.json();
    console.log(data.outputs[0].outputs[0].results.message.text);
    return Response.json(
      { message: data.outputs[0].outputs[0].results.message.text },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calling Langflow API:", error);
    return Response.json(
      { message: "Something went wrong contact the developer" },
      { status: 500 }
    );
  }
}
