import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[90vh] w-full rounded-xl overflow-hidden shadow-xl">
      {/* Background image with parallax */}
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1500&q=80"
        alt="Library Banner"
        className="object-cover w-full h-[110%]"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4 space-y-4">
        <h1 className="text-5xl font-bold drop-shadow-md">
          Welcome to Our Digital Library
        </h1>
        <p className="text-xl max-w-xl">
          Discover thousands of books and manage your borrowings in one place.
        </p>
        <Link to="/books">
          <Button variant="secondary" size="lg">
            Explore Books
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
