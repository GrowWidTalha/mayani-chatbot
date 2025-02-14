import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToCoreMessages, generateText } from "ai";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const google = createGoogleGenerativeAI({ apiKey: "AIzaSyBWLAhiAJpawXHpUqwYtdS-Gkgbhn4MvuQ"})

app.post("/ai", async (c) => {
  const {messages} = await c.req.json();
  console.log(messages);

  try {
    const model = google("gemini-1.5-pro-latest");
    const convertedMessages = convertToCoreMessages(messages);
    console.log(messages);
    console.log(convertedMessages);

    const result = await generateText({
      model: model,
      messages: convertedMessages,
      system: "Act like an mother who talks like it. Keep your answers short whenever its possible."
    });
    console.log(result.text);
    return c.json({ success: true, data: { result: result.text } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message });
  }
});

const port = 5000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
