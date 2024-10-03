"use client";

import { FadeInSection } from "@/components/animations/fade-in-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const inAppNotifications: NotificationSetting[] = [
  {
    id: "index",
    title: "Index",
    description:
      "Receive notifications about new data sources successfully indexed.",
    enabled: true,
  },
  {
    id: "activity",
    title: "Activity",
    description: "Receive notifications about new activity in your team.",
    enabled: true,
  },
];

const emailNotifications: NotificationSetting[] = [
  {
    id: "email-activity",
    title: "Activity",
    description: "Receive notifications about new activity in your team.",
    enabled: true,
  },
];

function NotificationItem({ setting }: { setting: NotificationSetting }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium text-white">{setting.title}</h3>
        <p className="text-sm text-muted-foreground">{setting.description}</p>
      </div>
      <Switch
        checked={setting.enabled}
        onCheckedChange={() => {
          console.log(`Toggled ${setting.title}`);
        }}
      />
    </div>
  );
}

export default function NotificationsSettingsPage() {
  return (
    <FadeInSection className="grid gap-6">
      <Card className="rounded-none bg-transparent">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your personal notification settings for this team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold">In-App Notifications</h3>
            <div className="space-y-2 divide-y divide-border">
              {inAppNotifications.map((setting) => (
                <NotificationItem key={setting.id} setting={setting} />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold">Email Notifications</h3>
            <div className="space-y-2 divide-y divide-border">
              {emailNotifications.map((setting) => (
                <NotificationItem key={setting.id} setting={setting} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeInSection>
  );
}
