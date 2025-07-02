import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

interface EditModalProps<T> {
  open: boolean;
  data: T | null;
  fields: {
    name: string;
    label: string;
    type: string;
    // readOnly: boolean;
  }[];

  title?: string;
  onClose: () => void;
  onSubmit: (updatedData: Partial<T>) => void;
}

const EditModal = <T,>({
  open,
  onClose,
  onSubmit,
  data,
  fields,
  title,
}: EditModalProps<T>) => {
  const [form, setForm] = useState<Partial<T>>({});

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          
          {fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              placeholder={field.label}
              value={(form[field.name as keyof T] as string) ?? ""}
              onChange={handleChange}
              type={field.type}
              // readOnly={field.readOnly ?? false}
            />
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
