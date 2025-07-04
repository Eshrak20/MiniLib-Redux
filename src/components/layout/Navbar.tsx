import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Boxes, Menu, X } from "lucide-react";
import { Link } from "react-router";
import CreateModal from "../Custom/CustomModal";
import { BookFieldsConfig } from "@/config/BookFieldsConfig";
import type { Book } from "@/types/Book";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const [createBook] = useCreateBookMutation();
  const [isOpen, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddClick = () => setOpen(true);
  const handleCreate = async (formData: Book) => {
    console.log("Creating book with data:", formData);
    try {
      await createBook(formData).unwrap();
      setOpen(false);
    } catch (err) {
      console.error("Creating failed", err);
    }
  };

  return (
    <nav className="bg-white dark:bg-black rounded-b-2xl max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Logo & Caption */}
      <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
        <div className="flex items-center gap-2">
          <Boxes
            className="w-7 h-7 text-primary cursor-pointer animate-pulse-on-off"
            aria-label="Library logo"
          />
          <span className="font-extrabold text-xl text-gray-800 dark:text-gray-200">
            Minimal Library Management
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic max-w-xs text-center sm:text-left">
          “A room without books is like a body without a soul.” – Cicero
        </p>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden absolute top-4 right-6 p-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links and Actions */}
      <div
        className={`sm:flex sm:items-center sm:gap-3 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "block mt-4 sm:mt-0" : "hidden sm:block"
        }`}
      >
        <Link to="/books">
          <Button variant="outline" className="whitespace-nowrap mb-2 sm:mb-0">
            All Books
          </Button>
        </Link>

        <Link to="/borrowed-books">
          <Button variant="outline" className="whitespace-nowrap mb-2 sm:mb-0">
            All Borrowed Books
          </Button>
        </Link>

        <Button onClick={handleAddClick} className="mb-2 sm:mb-0">
          Add Book
        </Button>

        <CreateModal
          open={isOpen}
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
          fields={BookFieldsConfig}
        />

        <ModeToggle />
      </div>

      {/* Custom CSS animation for pulse on/off */}
      <style jsx>{`
        .animate-pulse-on-off {
          animation: pulseOnOff 2s ease-in-out infinite;
        }

        @keyframes pulseOnOff {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 6px #3b82f6);
          }
          50% {
            opacity: 0.5;
            filter: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
