import React from "react";
import { JsonToHash } from "./JsontoHash";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <JsonToHash />
    </div>
  );
};

export default Home;
