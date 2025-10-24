const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
  apiVersion: "v1alpha",
});

const cleanAnswerText = (text) => {
  if (!text) return "";
  let cleaned = text;
  cleaned = cleaned.replace(/^#{1,6}\s+(.*)/gm, '\n$1');
  cleaned = cleaned.replace(/^[\s]*[\*\-]\s+(.*)/gm, '• $1');
  cleaned = cleaned.replace(/^[\s]*(\d+)\.\s+(.*)/gm, '$1. $2');
  cleaned = cleaned.replace(/^>\s+(.*)/gm, '  $1');
  cleaned = cleaned.replace(/\*\*([^\*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*([^\*]+)\*/g, '$1');
  cleaned = cleaned.replace(/_([^_]+)_/g, '$1');
  cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  cleaned = cleaned.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '');
  cleaned = cleaned.replace(/[ \t ]{2,}/g, ' ');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/^\s*\*\s*$/gm, '');
  return cleaned.trim();
};

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        thinkingConfig: {
          includeThoughts: true,
        },
      },
    });

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0] || !chunk.candidates[0].content) {
          continue; 
      }
        
      for (const part of chunk.candidates[0].content.parts) {
        if (!part.text) {
          continue;
        }
        
        if (part.thought) {
          res.write(`data: ${JSON.stringify({ thought: part.text })}\n\n`);
        
        } else {
          const cleanedAnswer = cleanAnswerText(part.text);
          res.write(`data: ${JSON.stringify({ answer: cleanedAnswer })}\n\n`);
  
        }
      }
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
    
    console.log("Itinerary generation completed");
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    

    const errorMessage = err.message || "An unknown error occurred during itinerary generation.";

    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
   
    res.end();
    
  }
});

module.exports = router;