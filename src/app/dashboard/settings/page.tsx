import { FadeInSection } from "@/components/animations/fade-in-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const runtime = "edge";

export default function GeneralSettingsPage() {
  return (
    <FadeInSection className="grid gap-6">
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Team Name</CardTitle>
          <CardDescription>Change the name of your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Team Name" />
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <p className="text-xs text-muted-foreground">
            This is the name that will be displayed to the public.
          </p>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card className="rounded-none border-destructive">
        <CardHeader>
          <CardTitle>Delete Team</CardTitle>
          <CardDescription>
            Delete your team and all of its data.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardFooter className="flex justify-end">
          <div />
          <Button variant="destructive">Delete</Button>
        </CardFooter>
      </Card>
    </FadeInSection>
  );
}
