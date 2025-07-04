import BorrowModal from "@/components/Custom/CustomModal";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import type { Book } from "@/types/Book";
import type { Borrow } from "@/types/Borrow";
import { FC } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedBook: Book | null;
}

const BorrowModalWrapper: FC<Props> = ({ open, onClose, selectedBook }) => {
  const [borrowBook] = useCreateBorrowMutation();

  if (!selectedBook) return null;

  const handleSubmit = async (borrowFormData: {
    quantity: number;
    dueDate: string;
  }) => {
    if (borrowFormData.quantity > (selectedBook.copies ?? 0)) {
      toast.error(
        `Cannot borrow more than available copies. Available: ${selectedBook.copies}`
      );
      return;
    }

    const borrowPayload: Borrow = {
      book: selectedBook._id,
      quantity: borrowFormData.quantity,
      dueDate: borrowFormData.dueDate,
    };

    try {
      await borrowBook(borrowPayload).unwrap();
      toast.success("Borrow successful!");
      onClose();
    } catch (err) {
      console.error("Borrow failed", err);
      toast.error("Something went wrong while borrowing the book.");
    }
  };

  return (
    <>
      <BorrowModal
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        data={selectedBook}
        fields={[
          {
            name: "quantity",
            label: "Quantity",
            type: "number",
          },
          {
            name: "dueDate",
            label: "Due Date",
            type: "date",
          },
        ]}
        title={`Borrow: ${selectedBook.title}`}
      />
    </>
  );
};

export default BorrowModalWrapper;
