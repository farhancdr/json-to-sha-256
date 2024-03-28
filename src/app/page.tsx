import React from "react";
import { JsonToHash } from "./JsontoHash";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mt-4 font-bold text-xl">
        CONVERT RAW JSON TO SHA-256 hash with secret key
      </p>
      <JsonToHash />
    </div>
  );
};

export default Home;
