import React, { memo } from "react";
import { BounceLoader } from "react-spinners";

const page = memo(({ params }) => {
  const search = decodeURIComponent(params.search);
  console.log("search: ", search);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-28 px-8 flex items-center justify-between">
        <span className="text-2xl font-bold text-first/80">Masproo22</span>
        <div className="h-full flex items-center gap-3">
          <BounceLoader size="1rem" color="green" />
          <span className="text-xl font-bold text-first/60">online</span>
        </div>
      </div>
      <div className="chat-body w-full h-full px-8 py-8"></div>
    </div>
  );
});

export default page;
