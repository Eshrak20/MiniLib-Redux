import BorrowModal from "@/components/Custom/CustomModal";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import type { Props } from "@/types/Props";
import { toast } from "react-toastify";
import type { FC } from "react"; //* this FC is a type only
import type { BorrowPayload } from "@/types/Borrow";
import { useNavigate } from "react-router";

const BorrowModalWrapper: FC<Props> = ({ open, onClose, selectedBook }) => {
  const [borrowBook] = useCreateBorrowMutation();
  const navigate = useNavigate();

  if (!selectedBook) return null;

  const handleSubmit = async (
    borrowFormData: Partial<{ quantity: number; dueDate: string }>
  ) => {
    const { quantity, dueDate } = borrowFormData;

    if (typeof quantity !== "number" || !dueDate) {
      toast.error("Please provide both quantity and due date.");
      return;
    }

    if (quantity > (selectedBook.copies ?? 0)) {
      toast.error(
        `Cannot borrow more than available copies. Available: ${selectedBook.copies}`
      );
      navigate("/");
      return;
    }

    const borrowPayload: BorrowPayload = {
      book: selectedBook._id,
      quantity,
      dueDate,
      totalQuantity: selectedBook.copies ?? 0,
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
        onSubmit={handleSubmit}
        open={open}
        onClose={onClose}
        data={{
          quantity: 1,
          dueDate: new Date().toISOString().split("T")[0], // today as default
        }}
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
