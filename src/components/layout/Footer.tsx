import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Code,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <div className="flex flex-col gap-2">
            <Link to="/books">
              <Button variant="outline" className="w-full">
                All Books
              </Button>
            </Link>
            <Link to="/borrowed-books">
              <Button variant="outline" className="w-full">
                All Borrowed Books
              </Button>
            </Link>
          </div>
        </div>

        {/* Head Office */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Head Office</h3>
          <p className="text-sm leading-relaxed">
            House #5, Road #01
            <br />
            Mohammadpur R/A, Dhaka-1207
            <br />
            +880 1521-498303
            <br />
            <a className="underline" href="mailto:library-Redux@gmail.com">
              library-Redux@gmail.com
            </a>
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <p className="text-sm leading-relaxed">
            Your one-stop solution for all digital needs — from stunning visuals
            to cutting-edge library solutions that amplify your online presence.
          </p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with Me</h3>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://twitter.com/eshrak_g46198"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-primary" />
            </a>
            <a
              href="https://linkedin.com/in/eshrak-g-2967a9278"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="hover:text-primary" />
            </a>
            <a
              href="https://www.facebook.com/eshrakg62"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-primary" />
            </a>
            <a
              href="https://www.youtube.com/@EshrakG-xy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="hover:text-primary" />
            </a>
            <a
              href="https://instagram.com/eshrakg62"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="hover:text-primary" />
            </a>
            <a
              href="https://www.hackerrank.com/eshrakg62"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="hover:text-primary" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Library Redux. All rights reserved. |
          Made with ❤️ by Eshrak
        </span>
      </div>
    </footer>
  );
};

export default Footer;
