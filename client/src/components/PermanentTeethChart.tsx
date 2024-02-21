import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageCheckbox from "./ImageCheckbox";
import one from "assets/teeths/permanent/1.png";
import two from "assets/teeths/permanent/2.png";
import three from "assets/teeths/permanent/3.png";
import four from "assets/teeths/permanent/4.png";
import five from "assets/teeths/permanent/5.png";
import six from "assets/teeths/permanent/6.png";
import seven from "assets/teeths/permanent/7.png";
import eight from "assets/teeths/permanent/8.png";

import oneRed from "assets/teeths/permanent/1-red.png";
import twoRed from "assets/teeths/permanent/2-red.png";
import threeRed from "assets/teeths/permanent/3-red.png";
import fourRed from "assets/teeths/permanent/4-red.png";
import fiveRed from "assets/teeths/permanent/5-red.png";
import sixRed from "assets/teeths/permanent/6-red.png";
import sevenRed from "assets/teeths/permanent/7-red.png";
import eightRed from "assets/teeths/permanent/8-red.png";

import seventeen from "assets/teeths/permanent/17.png";
import eighteen from "assets/teeths/permanent/18.png";
import nineteen from "assets/teeths/permanent/19.png";
import twenty from "assets/teeths/permanent/20.png";
import twentyOne from "assets/teeths/permanent/21.png";
import twentyTwo from "assets/teeths/permanent/22.png";
import twentyThree from "assets/teeths/permanent/23.png";
import twentyFour from "assets/teeths/permanent/24.png";

import seventeenRed from "assets/teeths/permanent/17-red.png";
import eighteenRed from "assets/teeths/permanent/18-red.png";
import nineteenRed from "assets/teeths/permanent/19-red.png";
import twentyRed from "assets/teeths/permanent/20-red.png";
import twentyOneRed from "assets/teeths/permanent/21-red.png";
import twentyTwoRed from "assets/teeths/permanent/22-red.png";
import twentyThreeRed from "assets/teeths/permanent/23-red.png";
import twentyFourRed from "assets/teeths/permanent/24-red.png";

type PermanentTeethChartProps = {
  form: any;
  teethType: string;
};

const firstQuadrant = [
  { image: one, checkedImage: oneRed, value: 1 },
  { image: two, checkedImage: twoRed, value: 2 },
  { image: three, checkedImage: threeRed, value: 3 },
  { image: four, checkedImage: fourRed, value: 4 },
  { image: five, checkedImage: fiveRed, value: 5 },
  { image: six, checkedImage: sixRed, value: 6 },
  { image: seven, checkedImage: sevenRed, value: 7 },
  { image: eight, checkedImage: eightRed, value: 8 },
];

const secondQuadrant = [
  { image: one, checkedImage: oneRed, value: 9 },
  { image: two, checkedImage: twoRed, value: 10 },
  { image: three, checkedImage: threeRed, value: 11 },
  { image: four, checkedImage: fourRed, value: 12 },
  { image: five, checkedImage: fiveRed, value: 13 },
  { image: six, checkedImage: sixRed, value: 14 },
  { image: seven, checkedImage: sevenRed, value: 15 },
  { image: eight, checkedImage: eightRed, value: 16 },
];

const thirdQuadrant = [
  {
    image: seventeen,
    checkedImage: seventeenRed,
    value: 17,
  },
  { image: eighteen, checkedImage: eighteenRed, value: 18 },
  { image: nineteen, checkedImage: nineteenRed, value: 19 },
  { image: twenty, checkedImage: twentyRed, value: 20 },
  {
    image: twentyOne,
    checkedImage: twentyOneRed,
    value: 21,
  },
  {
    image: twentyTwo,
    checkedImage: twentyTwoRed,
    value: 22,
  },
  {
    image: twentyThree,
    checkedImage: twentyThreeRed,
    value: 23,
  },
  {
    image: twentyFour,
    checkedImage: twentyFourRed,
    value: 24,
  },
];

const fourthQuadrant = [
  {
    image: seventeen,
    checkedImage: seventeenRed,
    value: 25,
  },
  { image: eighteen, checkedImage: eighteenRed, value: 26 },
  { image: nineteen, checkedImage: nineteenRed, value: 27 },
  { image: twenty, checkedImage: twentyRed, value: 28 },
  {
    image: twentyOne,
    checkedImage: twentyOneRed,
    value: 29,
  },
  {
    image: twentyTwo,
    checkedImage: twentyTwoRed,
    value: 30,
  },
  {
    image: twentyThree,
    checkedImage: twentyThreeRed,
    value: 31,
  },
  {
    image: twentyFour,
    checkedImage: twentyFourRed,
    value: 32,
  },
];

const PermanentTeethChart: React.FC<PermanentTeethChartProps> = ({
  form,
  teethType,
}) => {
  const { register, watch, setValue, reset } = form;
  const teethNums = watch("teethNums") || [];

  const handleCheckboxChange = (value: number, checked: boolean) => {
    if (checked) {
      setValue("teethNums", [...teethNums, value]);
    } else {
      setValue(
        "teethNums",
        teethNums.filter((num: number) => num !== value)
      );
    }
  };

  useEffect(() => {
    if (teethType !== "adult") {
      reset({ teethNums: [] });
    }
  }, [teethType, reset]);

  return (
    <Flex direction="column">
      <Flex>
        <Flex>
          {firstQuadrant.map((item) => (
            <ImageCheckbox
              id={item.value}
              key={item.value}
              value={item.value}
              {...(teethType === "adult" ? register("teethNums") : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
            />
          ))}
        </Flex>
        <Flex direction={"row-reverse"}>
          {secondQuadrant.map((item) => (
            <ImageCheckbox
              id={item.value}
              key={item.value}
              value={item.value}
              {...(teethType === "adult" ? register("teethNums") : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
              reverse={true}
            />
          ))}
        </Flex>
      </Flex>
      <Flex>
        <Flex>
          {thirdQuadrant.map((item) => (
            <ImageCheckbox
              id={item.value}
              key={item.value}
              value={item.value}
              {...(teethType === "adult" ? register("teethNums") : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
            />
          ))}
        </Flex>
        <Flex direction={"row-reverse"}>
          {fourthQuadrant.map((item) => (
            <ImageCheckbox
              id={item.value}
              key={item.value}
              value={item.value}
              {...(teethType === "adult" ? register("teethNums") : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
              reverse={true}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PermanentTeethChart;
