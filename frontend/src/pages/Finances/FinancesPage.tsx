import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

type FinancesPageProps = {};

const FinancesPage: React.FC<FinancesPageProps> = () => {
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        Finances Page
      </Alert>
    </div>
  );
};
export default FinancesPage;
