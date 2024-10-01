import React, { memo } from "react";

const page = memo(({ params }: { params: { myId: string; youId: string } }) => {
  console.log(params);

  return <div>page</div>;
});

export default page;
