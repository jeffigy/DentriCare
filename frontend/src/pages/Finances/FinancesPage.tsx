import {
  Flex,
  FormControl,
  FormLabel,
  ListItem,
  OrderedList,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import useTitle from "hooks/useTitle";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import "chartjs-adapter-date-fns";
import { useState } from "react";
import { Payment } from "types/Payment";
import ReactDatePicker from "react-datepicker";

const data = [
  // 82000
  { date: "2023-12-01", total: 17000 },
  { date: "2023-12-15", total: 12000 },
  { date: "2023-12-23", total: 3000 },
  {
    date: "2023-12-29",
    total: 45000,
  },
  {
    date: "2023-12-31",
    total: 5000,
  },
  // 72000
  { date: "2024-01-01", total: 10000 },
  { date: "2024-01-15", total: 2000 },
  { date: "2024-01-23", total: 30000 },
  {
    date: "2024-01-29",
    total: 5000,
  },
  {
    date: "2024-01-31",
    total: 25000,
  },

  // feb total of 166000
  { date: "2024-02-01", total: 50000 },
  { date: "2024-02-04", total: 24000 },
  {
    date: "2024-02-05",
    total: 15000,
  },
  {
    date: "2024-02-10",
    total: 35000,
  },
  { date: "2024-02-12", total: 42000 },

  // total 288500
].map((item) => ({
  date: Date.parse(item.date) / 1000, // convert to seconds
  total: item.total,
}));

const FinancesPage = () => {
  useTitle("Finances");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilter] = useState("day");

  const filteredData = data.filter((item) => {
    if (filter === "day") {
      // return all data todays date
      return (
        new Date(item.date * 1000).toDateString() === new Date().toDateString()
      );
    }
    if (filter === "week") {
      // return all data has date since the past 7 days
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return (
        new Date(item.date * 1000) >= lastWeek &&
        new Date(item.date * 1000) <= today
      );
    }
    if (filter === "month") {
      return new Date(item.date * 1000).getMonth() === startDate.getMonth();
    }
    if (filter === "year") {
      return (
        new Date(item.date * 1000).getFullYear() === startDate.getFullYear()
      );
    }
    if (filter === "all") {
      return true;
    }
    if (filter === "custom") {
      let itemDate = new Date(item.date * 1000);
      itemDate.setHours(0, 0, 0, 0);

      let start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      let end = new Date(endDate);
      end.setHours(0, 0, 0, 0);

      return itemDate >= start && itemDate <= end;
    }
  });

  const totalAmount = filteredData.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <FormControl>
        <FormLabel>Filter</FormLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Select filter"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All</option>
          <option value="custom">Custom</option>
        </Select>
      </FormControl>

      {filter === "custom" && (
        <ReactDatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates as Date[];
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      )}

      <OrderedList>
        {filteredData.map((item, index) => (
          <ListItem key={index}>
            {new Date(item.date * 1000).toLocaleDateString()} - {item.total}
          </ListItem>
        ))}
      </OrderedList>

      <Text>
        Total: <strong>{totalAmount}</strong>
      </Text>
      <Text>
        {/* return start and end date */}
        {new Date(startDate).toLocaleDateString()} -
        {new Date(endDate).toLocaleDateString()}
      </Text>
    </>
  );
};
export default FinancesPage;
