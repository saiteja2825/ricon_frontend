import { useState, useRef, useEffect } from "react";
import { useSendChatMessage } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Ricon Tech Career Mentor. How can I help you today? You can ask me about courses, internship preparation, or career roadmaps." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useSendChatMessage();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, chatMutation.isPending]);

  const handleSend = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInputValue("");
    
    // Call API
    chatMutation.mutate({ data: { message: text, studentId: null } }, {
      onSuccess: (response: any) => {
        setMessages(prev => [...prev, { role: "assistant", content: response.reply }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again later." }]);
      }
    });
  };

  const suggestions = [
    "How to become a Full Stack Developer?",
    "How to prepare for GATE?",
    "What skills are needed for AI/ML?",
    "Tips for cracking technical interviews"
  ];

  return (
    <div className="container py-8 px-4 md:px-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Career Mentor</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Online and ready to help
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/60 shadow-xl bg-card/60 backdrop-blur-md rounded-2xl">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 border-2 shadow-sm shrink-0 mb-1 ${msg.role === "assistant" ? "border-primary/20" : "border-background"}`}>
                    {msg.role === "assistant" ? (
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div 
                    className={`px-5 py-3.5 max-w-[85%] sm:max-w-[75%] shadow-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm" 
                        : "bg-muted/80 border border-border/50 text-foreground rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {chatMutation.isPending && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-3"
              >
                <Avatar className="h-8 w-8 border-2 border-primary/20 shadow-sm shrink-0 mb-1">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="px-5 py-4 bg-muted/80 border border-border/50 rounded-2xl rounded-bl-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 md:p-6 border-t border-border/50 bg-background/50">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map((suggestion, i) => (
                <button 
                  key={i} 
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  onClick={() => handleSend(suggestion)}
                >
                  <Sparkles className="h-3 w-3" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message AI Mentor..."
                className="h-14 pr-14 rounded-2xl bg-background border-border/60 shadow-sm text-base"
                disabled={chatMutation.isPending}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center pointer-events-none">
                <kbd className="inline-flex items-center rounded border border-border/80 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  Enter
                </kbd>
              </div>
            </div>
            <Button 
              type="submit" 
              className="h-14 w-14 shrink-0 rounded-2xl btn-gradient shadow-md"
              disabled={!inputValue.trim() || chatMutation.isPending}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
