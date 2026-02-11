import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res){

  const {name, country, details} = req.body;

  const prompt = `
Ты юрист в стране ${country}.
Напиши официальную жалобу в полицию на соседей за ночной шум.

От имени: ${name}
Описание: ${details}

Формальный юридический стиль.
`;

  const completion = await openai.chat.completions.create({
    model:"gpt-4.1-mini",
    messages:[{role:"user",content:prompt}]
  });

  res.json({text:completion.choices[0].message.content});
}
