import React, { useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.jsx";

export default function Tables({ setTitle }) {
  useEffect(() => { setTitle('Draco - Tables'); }, [setTitle]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}
