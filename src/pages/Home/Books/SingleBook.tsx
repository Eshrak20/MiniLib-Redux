import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  BookText,
  BookKey,
  BookUser,
  BookHeadphones,
  BookCheck,
  BookX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SingleBook = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id!);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image skeleton */}
          <div className="w-full md:w-1/3">
            <Skeleton className="h-96 w-full rounded-2xl shadow-xl" />
          </div>

          {/* Content skeleton */}
          <div className="w-full md:w-2/3 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-6 text-center"
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
          <BookX className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Failed to load book data
          </h2>
          <p className="text-red-500">
            Please try again later or check your connection
          </p>
        </div>
      </motion.div>
    );
  }

  // Placeholder for book cover if no image is available
  const bookCover =
    "/Pics/Marhaba_Javascripte_Maro_Thaba-Jhankar_Mahbub-5c238-455936.jpg";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="flex flex-col md:flex-row gap-8 mt-44 ">
        {/* Animated Book Cover */}
        <motion.div
          className="w-full md:w-1/3 lg:w-2/5"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative rounded-2xl shadow-2xl overflow-hidden h-96"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={bookCover}
              alt={`Cover of ${data.title}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <Badge
              variant={data.available ? "default" : "destructive"}
              className="absolute top-4 right-4 shadow-lg"
            >
              {data.available ? "Available" : "Unavailable"}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Book Details */}
        <motion.div
          className="w-full md:w-2/3 lg:w-3/5"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full border-0 shadow-none">
            <CardHeader>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {data.title}
                </CardTitle>
              </motion.div>
              <motion.p
                className="text-lg text-muted-foreground"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                by {data.author}
              </motion.p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <BookKey className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="font-medium">{data.isbn}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <BookUser className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Author</p>
                    <p className="font-medium">{data.author}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <BookHeadphones className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Genre</p>
                    <p className="font-medium">{data.genre}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <BookCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Copies</p>
                    <p className="font-medium">{data.copies} available</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <BookText className="h-5 w-5 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold">Description</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {data.description ||
                    "No description available for this book."}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SingleBook;
