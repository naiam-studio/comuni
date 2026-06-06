
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeDemocracyStatus = async (proposal: any) => {
  const ai = getAI();
  const prompt = `
    Como un facilitador de Democracia Abierta para "Comuni.com.ar", analiza esta propuesta:
    
    Título: ${proposal.title}
    Estado: ${proposal.status}
    Votos: Favor (${proposal.votes.yes}), En Contra (${proposal.votes.no}), Abstención (${proposal.votes.abstain})
    Discusión: ${proposal.comments.map((c: any) => c.text).join(' | ')}
    
    Proporciona un "Informe de Legitimidad" breve en español que incluya:
    1. Resumen de la voluntad popular actual.
    2. Principales preocupaciones expresadas por la minoría.
    3. Recomendación para que la decisión sea más inclusiva y transparente.
    
    Tono: Institucional, neutral y constructivo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini summary:", error);
    return "El analista de legitimidad no está disponible. Consulta el registro de votos manual.";
  }
};
