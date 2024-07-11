// ./frontend/src/containers/AdminDashboardContainer.tsx

import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import withErrorBoundary from "../hoc/withErrorBoundary";

const AdminDashboardContainer: React.FC = () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default withErrorBoundary(AdminDashboardContainer);
