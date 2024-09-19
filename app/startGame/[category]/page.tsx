import React, { memo } from "react";

const page = memo(({ params }) => {
  const category = decodeURIComponent(params.category);

  console.log(category);
  

  return <div>page</div>;
});

export default page;
