"use client";

import { deleteDatastoreAction } from "@/actions/delete-datastore-action";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useMemo, useState } from "react";

interface DeleteDatastoreModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  datastoreId: string;
}

function DeleteDatastoreModal({
  isOpen,
  setIsOpen,
  datastoreId,
}: DeleteDatastoreModalProps) {
  const { execute, status } = useAction(deleteDatastoreAction);

  const handleDelete = () => execute({ id: datastoreId });

  return (
    <Modal showModal={isOpen} setShowModal={setIsOpen} className="max-w-md p-6">
      <div className="space-y-2">
        <h2 className="text-base font-medium">Delete Datastore</h2>
        <p className="text-sm">Are you sure you want to delete this datastore?</p>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={status === "executing"}
        >
          {status === "executing" ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}

export function useDeleteDatastoreModal({
  datastoreId,
}: {
  datastoreId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const DeleteDatastoreModalCallback = useCallback(() => {
    return (
      <DeleteDatastoreModal
        datastoreId={datastoreId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    );
  }, [datastoreId, isOpen]);

  return useMemo(() => {
    return {
      DeleteDatastoreModal: DeleteDatastoreModalCallback,
      setShowDeleteDatastoreModal: setIsOpen,
    };
  }, [DeleteDatastoreModalCallback]);
}
