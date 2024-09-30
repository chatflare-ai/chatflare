"use client";

import { useState } from "react";
import { Chat } from "./Chat";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <div
        className={`mb-4 transition-all duration-300 ease-in-out transform origin-bottom-right
          ${
            isOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-2 pointer-events-none"
          }`}
      >
        <Chat />
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 p-0 rounded-full shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? "rotate-180" : "rotate-0"}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <Button className="sr-only">
          {isOpen ? "Close chat" : "Open chat"}
        </Button>
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
