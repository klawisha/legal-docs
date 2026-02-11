import OpenAI from "openai";

export async function POST(req) {
  try {
    const {name, country, details} = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Ты юрист в стране ${country}.
Напиши официальную жалобу на соседей за ночной шум.

От имени: ${name}
Описание: ${details}

Формальный стиль.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{role:"user", content:prompt}]
    });

    return Response.json({ text: completion.choices[0].message.content });
  } catch(e) {
    console.error("Error in /api/generate:", e);
    return new Response(JSON.stringify({error:e.message}), {
      status:500,
      headers:{ "Content-Type":"application/json" }
    });
  }
}
