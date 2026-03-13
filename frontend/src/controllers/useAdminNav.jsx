import { useState } from "react";

export const useAdminNav = () => {
  const [activeTab, setActiveTab] = useState("documents"); // Default view

  return { activeTab, setActiveTab };
};
