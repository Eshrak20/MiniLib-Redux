import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";

import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";
import CreateModal from "../Custom/CustomModal";
import { useState } from "react";
import { BookFieldsConfig } from "@/config/BookFieldsConfig";
import type { Book } from "@/types/Book";
import { useCreateBookMutation } from "@/redux/api/bookApi";

const Navbar = () => {
  const [createBook] = useCreateBookMutation();

  const [isOpen, setOpen] = useState(false);
  const handleAddClick = () => setOpen(true);
  const handleCreate = async (formData: Book) => {
    console.log("Creating book with data:", formData);
    try {
      await createBook(formData).unwrap();
    } catch (err) {
      console.error("Creating failed", err);
    }
  };
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 shadow-md rounded-b-2xl bg-white dark:bg-gray-900">
      {/* logo */}
      <div className="flex items-center gap-2">
        <Boxes className="w-6 h-6 text-primary" />
        <span className="font-bold text-xl">
          Minimal Library Management System
        </span>
      </div>

      {/* buttons */}
      <div className="flex gap-2">
        <Link to="/books">
          <Button variant="outline">All Books</Button>
        </Link>
        <Link to="/borrowed-books">
          <Button variant="outline">All Borrowed Books</Button>
        </Link>
        <Button
          onClick={() => {
            handleAddClick();
          }}
        >
          Add Books{" "}
        </Button>
        <CreateModal
          open={isOpen}
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
          fields={BookFieldsConfig}
        />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
