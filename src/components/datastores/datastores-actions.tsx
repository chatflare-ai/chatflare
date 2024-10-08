"use client";

import { useState } from "react";
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Datastore } from "@/server/db/schema";
import { useAddEditDatastoreModal } from "@/components/modals/add-edit-datastore-modal";
import { useDeleteDatastoreModal } from "@/components/modals/delete-datastore-modal";

interface DatastoreActionsProps {
  datastore: Datastore;
}

export function DatastoreActions({ datastore }: DatastoreActionsProps) {
  const router = useRouter();

  const { setShowAddEditDatastoreModal, AddEditDatastoreModal } =
    useAddEditDatastoreModal({
      datastore,
    });

  const { setShowDeleteDatastoreModal, DeleteDatastoreModal } =
    useDeleteDatastoreModal({
      datastoreId: datastore.id,
    });

  const handleCopyId = () => {
    navigator.clipboard.writeText(datastore.id);
    toast.success("Datastore ID copied to clipboard");
  };

  const handleRename = async () => {
    setShowAddEditDatastoreModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteDatastoreModal(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleCopyId}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRename}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddEditDatastoreModal />
      <DeleteDatastoreModal />
    </>
  );
}
