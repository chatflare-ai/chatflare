"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  SiGithub,
  SiGoogledrive,
  SiNotion,
  SiDropbox,
  type IconType,
} from "@icons-pack/react-simple-icons";
import { FadeInSection } from "@/components/animations/fade-in-section";
import connectOAuth from "@/lib/documents/sign-in";

export const runtime = "edge";

interface OAuthApp {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  connected: boolean;
}

const oauthApps: OAuthApp[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Connect your Google Drive account to sync and manage files.",
    icon: SiGoogledrive,
    connected: true,
  },
  {
    id: "notion",
    name: "Notion",
    description:
      "Integrate with Notion for seamless note-taking and collaboration.",
    icon: SiNotion,
    connected: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description:
      "Link your Dropbox account for cloud storage and file sharing.",
    icon: SiDropbox,
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect to GitHub for version control and code management.",
    icon: SiGithub,
    connected: true,
  },
];

function OAuthAppCard({ app }: { app: OAuthApp }) {
  return (
    <Card className="rounded-none flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start gap-4">
        <app.icon className="size-12" />
        <div className="flex flex-col gap-2">
          <CardTitle>{app.name}</CardTitle>
          <CardDescription>{app.description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <Switch
          checked={app.connected}
          onCheckedChange={() => {
            console.log(`Toggled ${app.name} connection`);
          }}
        />
        {app.connected ? (
          <Button variant="outline">Manage</Button>
        ) : (
          <form action={async () => connectOAuth(app.id)}>
            <Button variant="default" type="submit">
              Connect
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}

export default function OAuthSettingsPage() {
  return (
    <FadeInSection className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {oauthApps.map((app) => (
        <OAuthAppCard key={app.id} app={app} />
      ))}
    </FadeInSection>
  );
}
