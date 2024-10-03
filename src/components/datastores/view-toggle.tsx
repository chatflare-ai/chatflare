import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ViewToggleProps {
  view: string;
  setView: (view: string) => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("grid")}
      >
        <Icons.grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("list")}
      >
        <Icons.list className="h-4 w-4" />
      </Button>
    </div>
  );
}
