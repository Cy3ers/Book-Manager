// ./containers/DashboardContainer.tsx

import React from "react";
import { isAuthenticated } from "../auth";
import AdminDashboardContainer from "./AdminDashboardContainer";

const DashboardContainer: React.FC = () => {
  const auth = isAuthenticated();

  if (!auth) {
    return <div>Error: Not Authorized</div>;
  }

  return <AdminDashboardContainer />;
};

export default DashboardContainer;
