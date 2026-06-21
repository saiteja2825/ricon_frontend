import { Router, type IRouter } from "express";
import { SendChatMessageBody } from "@workspace/api-zod";

const router: IRouter = Router();

const careerResponses: Record<string, { reply: string; suggestions: string[] }> = {
  default: {
    reply: "Great question! At Ricon Technology, we help students bridge the gap between academics and industry. Based on your query, I recommend exploring our courses and internship programs tailored to your interests. Could you share more about your current skills or career goals so I can give you more personalized guidance?",
    suggestions: [
      "Which course should I learn next?",
      "How to become a Full Stack Developer?",
      "How to prepare for GATE?",
      "How to become an AI Engineer?",
    ],
  },
  fullstack: {
    reply: "To become a Full Stack Developer, follow this path: Start with HTML, CSS, JavaScript fundamentals, then learn React for frontend. For backend, master Node.js and Express. Learn PostgreSQL for databases, then deploy projects to cloud platforms. Ricon's Full Stack Development course covers this complete roadmap in 6 months with real project experience!",
    suggestions: [
      "What projects should I build?",
      "How long does it take to become a full stack dev?",
      "Which companies hire full stack developers?",
      "Show me Full Stack internships",
    ],
  },
  gate: {
    reply: "For GATE preparation: Start 12 months early. Focus on Engineering Mathematics, Data Structures, and Algorithms (high weightage). Use standard textbooks — CLRS for algorithms, Tanenbaum for OS. Solve 10 years of previous papers. Aim for IIT Madras, IIT Bombay, or IIT Delhi. Ricon's M.Tech Roadmap module has a structured study plan for GATE 2025!",
    suggestions: [
      "Which IIT should I target?",
      "What are PSU opportunities after GATE?",
      "How to prepare for IIT interview?",
      "Show me the M.Tech roadmap",
    ],
  },
  aiml: {
    reply: "To become an AI/ML Engineer: Master Python first, then statistics and linear algebra. Learn Scikit-learn for ML fundamentals, then deep dive into PyTorch or TensorFlow for deep learning. Study NLP with Hugging Face, then explore Generative AI and LLMs. Ricon's AI & Machine Learning course and our AI/ML internship projects give you hands-on experience with real applications!",
    suggestions: [
      "What is the difference between ML and Deep Learning?",
      "How to get into Generative AI?",
      "Which companies hire AI engineers?",
      "Show me AI/ML internships",
    ],
  },
  resume: {
    reply: "A strong tech resume should: (1) Start with a powerful summary highlighting your strongest skills. (2) Quantify achievements — 'Built a REST API serving 10,000 requests/day' beats 'Built API'. (3) List projects with GitHub links. (4) Include relevant certifications. (5) Keep it to 1 page for freshers. Our AI Career Assistant can review your resume in detail — share it in your student profile!",
    suggestions: [
      "What skills should I highlight?",
      "How to prepare for technical interviews?",
      "Which certifications are valuable?",
      "How to negotiate salary?",
    ],
  },
};

function getResponse(message: string): { reply: string; suggestions: string[] } {
  const lower = message.toLowerCase();
  if (lower.includes("full stack") || lower.includes("fullstack") || lower.includes("react") || lower.includes("node")) {
    return careerResponses.fullstack;
  }
  if (lower.includes("gate") || lower.includes("iit") || lower.includes("mtech") || lower.includes("m.tech")) {
    return careerResponses.gate;
  }
  if (lower.includes("ai") || lower.includes("ml") || lower.includes("machine learning") || lower.includes("deep learning")) {
    return careerResponses.aiml;
  }
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("interview")) {
    return careerResponses.resume;
  }
  return careerResponses.default;
}

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const response = getResponse(parsed.data.message);
  res.json(response);
});

export default router;
