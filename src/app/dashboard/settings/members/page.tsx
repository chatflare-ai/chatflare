import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { FadeInSection } from "@/components/animations/fade-in-section";

function MembersList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input className="max-w-sm" placeholder="Search..." />
        <Button>Invite member</Button>
      </div>
      <div className="bg-secondary rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/path-to-avatar.jpg" alt="Wanjun Lee" />
              <AvatarFallback>WL</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Wanjun Lee</p>
              <p className="text-sm text-muted-foreground">
                jotyy318@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Owner</span>
            <Button variant="ghost" size="icon">
              <Icons.ellipsis className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PendingInvitations() {
  return <div>Pending Invitations Content</div>;
}

export default function MembersSettingsPage() {
  return (
    <FadeInSection className="grid gap-6">
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <MembersList />
        </TabsContent>
        <TabsContent value="pending">
          <PendingInvitations />
        </TabsContent>
      </Tabs>
    </FadeInSection>
  );
}
