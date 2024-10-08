import type { Datastore } from "@/server/db/schema";
import { DatastoreActions } from "./datastores-actions";
import { CalendarDays, Database, FileText } from "lucide-react";
import { formatBytes, formatDate } from "@/lib/utils";

interface DatastoresGridProps {
  datastores: Datastore[];
}

export function DatastoresGrid({ datastores }: DatastoresGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {datastores.map((datastore) => (
        <div
          key={datastore.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{datastore.name}</h3>
            <DatastoreActions datastore={datastore} />
          </div>
          <p className="text-sm text-muted-foreground mb-3">{datastore.description}</p>
          <div className="flex items-center space-x-4 text-xs mb-2">
            <div className="flex items-center">
              <Database className="mr-1 h-3 w-3" />
              <span>0 docs</span>
            </div>
            <div className="flex items-center">
              <FileText className="mr-1 h-3 w-3" />
              <span>0 Bytes</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <CalendarDays className="mr-1 h-3 w-3" />
            <span>Updated {formatDate(datastore.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
