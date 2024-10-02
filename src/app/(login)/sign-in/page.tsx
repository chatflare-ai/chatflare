import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signIn } from "@/server/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] relative items-center justify-center bg-gray-100 px-4 dark:bg-white">
      <div className="mx-auto z-10 text-gray-700 w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-normal font-geist tracking-tighter">
            Welcome back
          </h1>
          <p className="text-gray-800/90 dark:text-gray-400 font-geist font-normal">
            Sign in to your account to continue
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              className="h-10"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              required
              type="password"
              className="h-10"
            />
          </div>
          <Button className="relative h-12 w-full mx-auto text-center font-geist tracking-tighter overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Don't have an account?
            <Link
              className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
              href="#"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Forgot your password?
            <Link
              className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
              href="#"
            >
              Reset password
            </Link>
          </p>
        </div>
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-center gap-4">
            <form
              action={async () => {
                "use server";

                await signIn("github");

                redirect("/dashboard");
              }}
            >
              <Button>
                <Icons.gitHub className="mr-2 size-4" />
                Sign in with GitHub
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
