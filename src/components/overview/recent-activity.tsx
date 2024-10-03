import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Key, UserPlus, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "/avatars/john-doe.png",
    },
    action: "uploaded a new document",
    target: "Q3 Financial Report.pdf",
    time: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 2,
    user: {
      name: "System",
      avatar: "/avatars/system.png",
    },
    action: "generated an API key for project",
    target: "AI Assistant",
    time: "4 hours ago",
    icon: <Key className="h-4 w-4" />,
  },
  {
    id: 3,
    user: {
      name: "Jane Smith",
      avatar: "/avatars/jane-smith.png",
    },
    action: "joined the platform",
    target: "",
    time: "1 day ago",
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    id: 4,
    user: {
      name: "AI Processor",
      avatar: "/avatars/ai-processor.png",
    },
    action: "successfully processed document",
    target: "Q2 Report",
    time: "2 days ago",
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  {activity.action}
                  {activity.target && (
                    <span className="font-semibold"> {activity.target}</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {activity.icon}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
