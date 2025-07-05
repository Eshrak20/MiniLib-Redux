import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Boxes, Menu, X } from "lucide-react";
import { Link } from "react-router";
import CreateModal from "../Custom/CustomModal";
import { BookFieldsConfig } from "@/config/BookFieldsConfig";
import type { Book } from "@/types/Book";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { ModeToggle } from "../mode-toggle";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const [createBook] = useCreateBookMutation();
  const [isOpen, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleAddClick = () => setOpen(true);
  const handleCreate = async (formData: Partial<Book>) => {
    toast.success(`Book "${formData.title}" Created successfully`);
    try {
      await createBook(formData as Book).unwrap();
      setOpen(false);
    } catch (err) {
      console.error("Creating failed", err);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <nav
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-white dark:bg-black `}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Boxes
                className="w-7 h-7 text-primary cursor-pointer animate-pulse-on-off"
                aria-label="Library logo"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-gray-800 dark:text-gray-200">
                  Minimal Library
                </span>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic max-w-xs">
                  “A room without books is like a body without a soul.” – Cicero
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:gap-3 absolute sm:static top-full left-0 w-full sm:w-auto bg-white dark:bg-black border-t sm:border-none transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "block" : "hidden sm:flex"
            }`}
          >
            <Link to="/books">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-none sm:rounded mb-2 sm:mb-0"
              >
                All Books
              </Button>
            </Link>
            <Link to="/borrowed-books">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-none sm:rounded mb-2 sm:mb-0"
              >
                All Borrowed Books
              </Button>
            </Link>
            <Button
              onClick={handleAddClick}
              className="w-full sm:w-auto mb-2 sm:mb-0"
            >
              Add Book
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>

      <CreateModal
        open={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
        fields={BookFieldsConfig}
      />

      <style>{`
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
    </>
  );
};

export default Navbar;
