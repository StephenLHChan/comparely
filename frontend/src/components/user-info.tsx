import { ExtendedUser } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import UserAvatar from "./user-avatar";
import { Mail } from "lucide-react";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card>
      <CardContent className="relative pt-6 lg:pt-12">
        <Badge className="absolute start-4 top-4">{user?.role}</Badge>
        <div className="space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <UserAvatar image={user?.image} className="h-24 w-24" />
            <div className="text-center">
              <h5 className="text-lg font-semibold">{user?.name}</h5>
            </div>
          </div>
          {/* TODO: Add # of contribution */}
          {/* <div className="grid grid-cols-3 divide-x text-center">
            <div>
              <h5 className="text-lg font-semibold">184</h5>
              <div className="text-sm text-muted-foreground">Post</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">32</h5>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">4.5K</h5>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
          </div> */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" /> {user?.email || "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
