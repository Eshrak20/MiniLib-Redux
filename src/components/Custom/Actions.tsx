import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { Book } from "@/types/book";
import EditModal from "./CustomModal";
import type { ActionProps } from "@/types/ActionProps";

const Action = ({
  actions,
  data,
  onDeleteConfirm,
  onEditSubmit,
}: ActionProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // Dynamically generate fields from data keys
  const fields = Object.keys(data)
    .filter((key) => key !== "_id" && key !== "available")
    .map((key) => ({
      name: key,
      label: key,
      type: typeof data[key as keyof Book] === "string" ? "text" : "number", //* osthir ekta jinish banaysi auto input type
      // readOnly: key === "available"
    }));

  const handleDeleteClick = () => setOpenDelete(true);
  const handleEditClick = () => setOpenEdit(true);

  return (
    <>
      <div className="flex gap-2 mt-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            size="sm"
            variant={action.variant}
            onClick={() => {
              if (action.type === "delete") handleDeleteClick();
              else if (action.type === "edit") handleEditClick();
            }}
          >
            {action.label}
          </Button>
        ))}
      </div>

      {/* Delete dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{data?.title ?? "this item"}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDelete(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onDeleteConfirm) onDeleteConfirm(data);
                setOpenDelete(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit modal */}
      <EditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={(updatedData) => {
          if (onEditSubmit) onEditSubmit({ ...data, ...updatedData });
          setOpenEdit(false);
        }}
        data={data}
        fields={fields} //* dynamically generated here
        title={actions[1].title}
      />
    </>
  );
};

export default Action;
