"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-80 bg-white border shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
          🔅
        </div>
        <h2 className="ml-3 text-lg font-semibold">Chatflare</h2>
      </div>
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center space-x-2 bg-muted rounded-full p-1">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm"
          />
          <Button
            size="sm"
            className="rounded-full p-2 bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
