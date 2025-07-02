import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies?: number;
}

interface BookEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedBook: Partial<Book>) => void;
  book: Book | null;
}

const BookEditModal = ({ open, onClose, onSubmit, book }: BookEditModalProps) => {
  const [form, setForm] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    genre: book?.genre ?? "",
    isbn: book?.isbn ?? "",
    copies: book?.copies ?? 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  // update form if book changes
  React.useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies ?? 1,
      });
    }
  }, [book]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <Input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
          <Input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <Input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
          <Input
            name="copies"
            placeholder="Copies"
            type="number"
            value={form.copies}
            onChange={handleChange}
          />
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

export default BookEditModal;
