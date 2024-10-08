"use client";

import { Icons } from "@/components/icons";
import { useAddEditDatastoreModal } from "@/components/modals/add-edit-datastore-modal";
import { Button } from "@/components/ui/button";

export function AddEditDatastore() {
  const { AddEditDatastoreModal, setShowAddEditDatastoreModal } =
    useAddEditDatastoreModal({});

  return (
    <>
      <Button onClick={() => setShowAddEditDatastoreModal(true)}>
        <Icons.add />
        Create Datastore
      </Button>
      <AddEditDatastoreModal />
    </>
  );
}
