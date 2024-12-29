import { User } from "@/data/user";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/user-avatar";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CalendarIcon, CircleCheck, CircleX, Mail } from "lucide-react";

interface UserInfoProps {
  user?: User;
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
          <div className="grid grid-cols-3 divide-x text-center">
            <div>
              <h5 className="text-lg font-semibold">
                {user?.created_at
                  ? format(new Date(user.created_at), "MMM yyyy")
                  : "N/A"}
              </h5>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">
                {user?.created_at
                  ? format(new Date(user.created_at), "MMM yyyy")
                  : "N/A"}
              </h5>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">
                {user?.created_at
                  ? format(new Date(user.created_at), "MMM yyyy")
                  : "N/A"}
              </h5>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" /> {user?.email || "N/A"}{" "}
              <HoverCard>
                <HoverCardTrigger asChild>
                  {user?.emailVerified ? (
                    <CircleCheck className="font-semibold text-emerald-500" />
                  ) : (
                    <CircleX className="font-semibold text-destructive" />
                  )}
                </HoverCardTrigger>
                <HoverCardContent className="w-60">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <p className="text-sm">
                        Email {!user?.emailVerified && "not"} verified!
                      </p>
                      {user?.emailVerified && (
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Verified{" "}
                            {format(
                              new Date(user.emailVerified),
                              "MMM dd yyyy"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
