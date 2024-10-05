import { AnimatedText } from "@/components/animations/animated-text";
import { Header } from "@/components/landing/header";
import { CopyText } from "@/components/shared/copy-text";
import { SiCloudflare, SiCloudflareHex } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export const runtime = "edge";

export default async function Page() {
  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute -top-[118px] inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4.5rem_2rem] -z-10 [transform:perspective(1000px)_rotateX(-63deg)] h-[80%] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none -z-10" />

        <h1 className="font-departure text-[40px] md:text-[84px] relative z-10 text-center h-[120px] md:h-auto leading-tight">
          <AnimatedText text="Fully Free AI Chatbot" />
        </h1>

        <p className="relative z-10 text-center max-w-[80%] mt-0 md:mt-4">
          An open-source AI chatbot built on top of{" "}
          <Link
            href="https://cloudflare.com"
            className="underline font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Cloudflare
          </Link>
          .
        </p>

        <div className="mt-10 mb-8">
          <CopyText value="bunx degit chatflare-ai/chatflare chatflare" />
        </div>

        <Link href="https://chatflare.co" target="_blank" rel="noreferrer">
          <div className="flex items-center gap-2">
            <SiCloudflare className="h-4" color={SiCloudflareHex} />
            <span className="text-sm">Hosted on Cloudflare</span>
          </div>
        </Link>

        <div className="absolute -bottom-[280px] inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4.5rem_2rem] -z-10 [transform:perspective(560px)_rotateX(63deg)] pointer-events-none" />
        <div className="absolute w-full bottom-[100px] h-1/2  bg-gradient-to-b from-background to-transparent pointer-events-none -z-10" />
      </div>
    </div>
  );
}
