import OpenAI from "openai";

export async function POST(req) {

  const {name, country, details} = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
Ты юрист в стране ${country}.
Напиши официальную жалобу на соседей за ночной шум.

От имени: ${name}
Описание: ${details}

Формальный стиль.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{role:"user",content:prompt}]
  });

  return Response.json({
    text: completion.choices[0].message.content
  });
}
