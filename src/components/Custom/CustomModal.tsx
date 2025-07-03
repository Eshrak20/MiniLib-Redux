import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import type { EditModalProps } from "@/types/EditModalProps";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CustomModal = <T,>({
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
    } else {
      // for create, reset form to empty
      setForm({});
    }
  }, [data, open]);

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
          <DialogTitle>{title ?? (data ? "Edit" : "Create")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => {
            if (field.type === "checkbox") {
              return (
                <div key={field.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={(form[field.name as keyof T] as boolean) ?? false}
                    onCheckedChange={(checked) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor={field.name}>{field.label}</Label>
                </div>
              );
            } else if (field.type === "select" && field.options) {
              return (
                <div key={field.name} className="space-y-1">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: value,
                      }))
                    }
                    defaultValue={(form[field.name as keyof T] as string) ?? ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            } else {
              return (
                <div key={field.name} className="space-y-1">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    name={field.name}
                    placeholder={field.label}
                    value={(form[field.name as keyof T] as string) ?? ""}
                    onChange={handleChange}
                    type={field.type}
                  />
                </div>
              );
            }
          })}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{data ? "Update" : "Create"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
