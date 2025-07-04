import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t mt-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <div className="flex flex-col gap-2">
            <Link to="/books">
              <Button variant="outline" className="w-full">All Books</Button>
            </Link>
            <Link to="/borrowed-books">
              <Button variant="outline" className="w-full">All Borrowed Books</Button>
            </Link>
          </div>
        </div>

        {/* Head Office */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Head Office</h3>
          <p className="text-sm">
            House # 5, Road # 01<br />
            Mohammadpur R/A, Dhaka-1207<br />
            +880 1521-498303<br />
            library-Redux@gmail.com
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Our Services</h3>
          <p className="text-sm">
            Your one-stop solution for all digital needs — from stunning visuals to
            cutting-edge library solutions that amplify your online presence.
          </p>
        </div>
      </div>
      <div className="border-t text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Library Redux. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
