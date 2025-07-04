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
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      const defaultForm: Partial<T> = {};
      fields.forEach((field) => {
        if (field.type === "checkbox") {
          defaultForm[field.name as keyof T] = true as any;
        }
      });
      setForm(defaultForm);
    }
    setValidationError(null);
  }, [data, open, fields]);

  const isBorrow = title?.startsWith("Borrow:");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    // required field validation
    for (const field of fields) {
      if (field.name === "createdAt" || field.name === "updatedAt") continue;

      const fieldValue = form[field.name as keyof T];

      if (
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === "" ||
        (field.type === "checkbox" && fieldValue === false)
      ) {
        setValidationError(`${field.label} is required.`);
        return;
      }

      if (field.type === "number" && typeof fieldValue === "number") {
        if (fieldValue < 0) {
          setValidationError(`${field.label} must be greater than 0.`);
          return;
        }
      }
    }

    // all checks passed
    setValidationError(null);
    onSubmit(form);
    onClose();

    if (
      isBorrow &&
      data &&
      data.copies !== undefined &&
      typeof data.copies === "number" &&
      form["quantity"] !== undefined &&
      data.copies > Number(form["quantity"])
    ) {
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
          <Alert variant="destructive" className="mb-2">
            <AlertTitle>Server Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {validationError && (
          <Alert variant="destructive" className="mb-2">
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
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
                      checked={(form[field.name as keyof T] as boolean) ?? true}
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
                      className={
                        field.type === "date"
                          ? "dark:bg-white dark:text-black"
                          : ""
                      }
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
