import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <ClipLoader size={50} color="#0f766e" />
    </div>
  );
};

export default Loading;
