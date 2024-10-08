"use client";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createDatastoreAction } from "@/actions/create-datastore-action";
import type { Datastore } from "@/server/db/schema";
import { updateDatastoreAction } from "@/actions/update-datastore-action";

interface AddEditDatastoreModalProps {
  showAddEditDatastoreModal: boolean;
  setShowAddEditDatastoreModal: Dispatch<SetStateAction<boolean>>;
  datastore?: Datastore;
}

function AddEditDatastoreModal({
  showAddEditDatastoreModal,
  setShowAddEditDatastoreModal,
  datastore,
}: AddEditDatastoreModalProps) {
  const router = useRouter();
  const [name, setName] = useState(datastore?.name || "");
  const [description, setDescription] = useState(datastore?.description || "");

  return (
    <Modal
      showModal={showAddEditDatastoreModal}
      setShowModal={setShowAddEditDatastoreModal}
    >
      <div className="inline-block w-full max-w-md overflow-hidden align-middle transition-all transform bg-background shadow-xl rounded-2xl">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-medium">
            {datastore ? "Edit Data Store" : "Add Data Store"}
          </h3>
        </div>
        <form
          action={async (formData: FormData) => {
            const name = formData.get("name") as string;
            const description = formData.get("description") as string;

            try {
              if (datastore) {
                await updateDatastoreAction({
                  id: datastore.id,
                  name,
                  description,
                });
                toast.success("Data store updated successfully");
              } else {
                await createDatastoreAction({ name, description });
                toast.success("Data store created successfully");
              }
              setShowAddEditDatastoreModal(false);
              router.refresh();
            } catch (error) {
              toast.error(
                `Failed to ${datastore ? "update" : "create"} data store: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`,
              );
            }
          }}
          className="flex flex-col space-y-4 px-6 py-8"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Data Store"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of the data store"
            />
          </div>
          <Button type="submit" className="w-full">
            {datastore ? "Save Changes" : "Create Data Store"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export function useAddEditDatastoreModal({
  datastore,
}: {
  datastore?: Datastore;
}) {
  const [showAddEditDatastoreModal, setShowAddEditDatastoreModal] =
    useState(false);

  const AddEditDatastoreModalCallback = useCallback(() => {
    return (
      <AddEditDatastoreModal
        showAddEditDatastoreModal={showAddEditDatastoreModal}
        setShowAddEditDatastoreModal={setShowAddEditDatastoreModal}
        datastore={datastore}
      />
    );
  }, [showAddEditDatastoreModal, datastore]);

  return useMemo(() => {
    return {
      AddEditDatastoreModal: AddEditDatastoreModalCallback,
      showAddEditDatastoreModal,
      setShowAddEditDatastoreModal,
    };
  }, [AddEditDatastoreModalCallback, showAddEditDatastoreModal]);
}
