"use client";

import { useState } from "react";
import StudentTable from "./dashboard/table";

export default function ShowFilter() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <div className="">
      <button onClick={toggleFilter} className="">
        {showFilter ? "Hide Student" : "Show Student"}
      </button>

      {showFilter && (
        <div>
          <StudentTable />
        </div>
      )}
    </div>
  );
}
