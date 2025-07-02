import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";

import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
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
        <Link to="/users">
          <Button>Add Books</Button>
        </Link>
      <ModeToggle/>

      </div>
    </nav>
  );
};

export default Navbar;
