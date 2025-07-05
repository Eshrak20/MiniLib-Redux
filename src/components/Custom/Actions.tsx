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
import EditModal from "./CustomModal";
import type { ActionProps } from "@/types/ActionProps";
import { useNavigate } from "react-router";
import { BookFieldsConfig } from "@/config/BookFieldsConfig";
const Action = ({
  actions,
  data,
  onDeleteConfirm,
  onEditSubmit,
}: ActionProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = () => setOpenDelete(true);
  const handleEditClick = () => setOpenEdit(true);
  const handleViewClick = () => navigate(`/single-book/${data._id}`);
  return (
    <>
      <div className="flex gap-2 mt-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            size="sm"
            onClick={() => {
              if (action.type === "delete") handleDeleteClick();
              else if (action.type === "edit") handleEditClick();
              else if (action.type === "view") handleViewClick();
            }}
          >
            {action.icon}
          </Button>
        ))}
      </div>
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

      <EditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={(updatedData) => {
          if (onEditSubmit) onEditSubmit({ ...data, ...updatedData });
          setOpenEdit(false);
        }}
        data={data}
        fields={BookFieldsConfig}
        title={actions[1].title}
      />
    </>
  );
};

export default Action;
