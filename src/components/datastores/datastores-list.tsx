import type { Datastore } from "@/server/db/schema";
import { DatastoreActions } from "./datastores-actions";
import { CalendarDays, Database, FileText, ChevronRight } from "lucide-react";
import { formatBytes, formatDate } from "@/lib/utils";

interface DatastoresListProps {
  datastores: Datastore[];
}

export function DatastoresList({ datastores }: DatastoresListProps) {
  return (
    <div className="space-y-2">
      {datastores.map((datastore) => (
        <div
          key={datastore.id}
          className="group bg-background cursor-pointer"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4 flex-grow">
              <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Database className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{datastore.name}</h3>
                <p className="text-sm text-muted-foreground truncate max-w-md">
                  {datastore.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                <span>{formatBytes(0)}</span>
                <span>0 docs</span>
              </div>
              <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                <span>Updated</span>
                <span>{formatDate(datastore.updatedAt)}</span>
              </div>
              <DatastoreActions datastore={datastore} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
