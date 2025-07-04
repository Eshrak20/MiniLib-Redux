import Books from "./Books/Books";
import Banner from "./Banner/Banner";
import About from "./About/About";

const Home = () => {
  return (
    <div>
      <Banner/>
      <About/>
      <Books />
    </div>
  );
};

export default Home;
