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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const CustomModal = <T,>({
  open,
  onClose,
  onSubmit,
  data,
  fields,
  title,
  error,
}: EditModalProps<T>) => {
  const [form, setForm] = useState<Partial<T>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({});
    }
  }, [data, open]);

  const isBorrow = title?.startsWith("Borrow:");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    if (isBorrow) {
      navigate("/borrowed-books");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? (data ? "Edit" : "Create")}</DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Please Try Again there</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          {fields
            .filter(
              (field) =>
                field.name !== "createdAt" && field.name !== "updatedAt"
            )
            .map((field) => {
              if (field.type === "checkbox") {
                return (
                  <div key={field.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={
                        (form[field.name as keyof T] as boolean) ?? false
                      }
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
                    <Select
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.name]: value,
                        }))
                      }
                      defaultValue={
                        (form[field.name as keyof T] as string) ?? ""
                      }
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
            <Button onClick={handleSubmit}>
              {isBorrow ? "Borrow Book" : data ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
