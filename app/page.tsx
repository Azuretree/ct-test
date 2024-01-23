import { Suspense } from "react";
import { Main } from "../Components/Main";

const Home = () => {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
};

export default Home;