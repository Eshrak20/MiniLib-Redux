import Books from "./Books/Books";
import Banner from "./Banner/Banner";
import About from "./About/About";

const Home = () => {
  return (
    <div>
      <Banner/>
      <Books isHome={true} />
      <About/>
    </div>
  );
};

export default Home;
