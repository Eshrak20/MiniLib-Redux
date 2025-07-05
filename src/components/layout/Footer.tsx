import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Code,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Bookmark,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/eshrak_g46198",
      name: "Twitter"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/eshrak-g-2967a9278",
      name: "LinkedIn"
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/eshrakg62",
      name: "Facebook"
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      url: "https://www.youtube.com/@EshrakG-xy",
      name: "YouTube"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com/eshrakg62",
      name: "Instagram"
    },
    {
      icon: <Code className="w-5 h-5" />,
      url: "https://www.hackerrank.com/eshrakg62",
      name: "HackerRank"
    }
  ];

  return (
    <footer className="relative bg-background text-foreground border-t mt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      {/* Main footer content with backdrop blur */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 backdrop-blur-sm">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Navigation
          </h3>
          <div className="flex flex-col gap-3">
            <Link to="/books">
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                All Books
              </Button>
            </Link>
            <Link to="/borrowed-books">
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                Borrowed Books
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Head Office */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Head Office
          </h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
              House #18, Road #05<br />
              Mohammadpur R/A, Dhaka-1207
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              +880 1309176398
            </p>
            <a 
              href="mailto:library-Redux@gmail.com" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-muted-foreground" />
              miniLibredux@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            Our Services
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your one-stop solution for all digital needs — from stunning visuals
            to cutting-edge library solutions that amplify your online presence.
          </p>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">Connect with Me</h3>
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex flex-col items-center gap-1"
                whileHover={{ y: -3 }}
              >
                {social.icon}
                <span className="text-xs text-muted-foreground">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright section */}
      <motion.div 
        className="relative z-10 border-t border-border/50 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Library Redux. All rights reserved.
          </p>
          <p className="mt-1">
            Made with ❤️ by <span className="text-primary">Eshrak</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;