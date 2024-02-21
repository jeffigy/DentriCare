import { Flex } from "@chakra-ui/react";
import BalanceList from "features/finances/ BalanceList";
import RevenueCard from "features/finances/RevenueCard";
import useTitle from "hooks/useTitle";

const FinancesPage = () => {
  useTitle("Finances");

  return (
    <Flex direction={"column"} w={"full"} align={"center"}>
      <RevenueCard />
      <BalanceList />
    </Flex>
  );
};
export default FinancesPage;
