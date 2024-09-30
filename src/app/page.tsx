import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { Zap, MessageCircle, Globe } from "lucide-react";
import { ChatBubble } from '@/components/ChatBubble';

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  const userCount = await db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(users);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-primary/10 to-secondary/20">
      <div className="max-w-5xl w-full px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <span className="text-3xl" role="img" aria-hidden="true">
              🔅
            </span>
            <span className="text-2xl font-bold">FlareChat</span>
          </div>
          <ThemeToggle />
        </nav>

        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to FlareChat
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experience lightning-fast, AI-powered conversations
          </p>
          {session?.user?.email ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-lg">Welcome back, {session.user.name}! 👋</p>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button>
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex justify-center">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <Button size="lg">
                  Start Chatting
                </Button>
              </form>
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-md">
              <feature.icon className="w-6 h-6 text-primary mb-2" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </section>

        <footer className="text-center text-sm text-muted-foreground">
          <p>Join our growing community of {userCount[0]!.count} users!</p>
          <p>&copy; 2024 FlareChat. All rights reserved.</p>
        </footer>
      </div>
      <ChatBubble />
    </main>
  );
}

const features = [
  {
    title: "AI-Powered Conversations",
    description: "Engage in intelligent discussions with our advanced AI chatbot.",
    icon: Zap,
  },
  {
    title: "Real-Time Messaging",
    description: "Experience seamless, instant communication with other users.",
    icon: MessageCircle,
  },
  {
    title: "Multi-Platform Support",
    description: "Access FlareChat on web, mobile, and desktop for chat anywhere, anytime.",
    icon: Globe,
  },
];
