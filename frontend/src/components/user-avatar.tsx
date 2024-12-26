import { cn, generateAvatarFallback } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

type AvatarProps = {
  image?: string | null;
  fallback?: string | null;
  className?: string;
};

export default function UserAvatar({
  image,
  fallback,
  className,
}: AvatarProps) {
  const userImage = image || "/images/placeholder.jpg";
  const userFallback = fallback || "AB";

  return (
    <Avatar className={cn("h-12 w-12 border", className)}>
      <AvatarImage src={userImage} alt="avatar image" />
      <AvatarFallback>{generateAvatarFallback(userFallback)}</AvatarFallback>
    </Avatar>
  );
}
