import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button>Add Data Source</Button>
        <Button variant="outline">Generate API Key</Button>
        <Button variant="outline">View Documentation</Button>
        <Button variant="outline">View API Calls</Button>
      </CardContent>
    </Card>
  );
}
