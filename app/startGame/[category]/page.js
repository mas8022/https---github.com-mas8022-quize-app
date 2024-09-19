import React, { memo } from "react";

const page = memo(({ params }) => {
  const category = params.category;

  return <div>page</div>;
});

export default page;
