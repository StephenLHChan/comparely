import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-normal">
      <h1 className={cn("text-3xl font-semibold")}>Comparely</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
