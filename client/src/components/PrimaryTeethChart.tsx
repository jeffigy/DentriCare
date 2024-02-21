import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageCheckbox from "./ImageCheckbox";
import first from "assets/teeths/primary/1.png";
import second from "assets/teeths/primary/2.png";
import third from "assets/teeths/primary/3.png";
import fourth from "assets/teeths/primary/4.png";
import fifth from "assets/teeths/primary/5.png";
import eleven from "assets/teeths/primary/11.png";
import twelve from "assets/teeths/primary/12.png";
import thirteen from "assets/teeths/primary/13.png";
import fourteen from "assets/teeths/primary/14.png";
import fifthteen from "assets/teeths/primary/15.png";
import firstRed from "assets/teeths/primary/1-red.png";
import secondRed from "assets/teeths/primary/2-red.png";
import thirdRed from "assets/teeths/primary/3-red.png";
import fourthRed from "assets/teeths/primary/4-red.png";
import fifthRed from "assets/teeths/primary/5-red.png";
import elevenRed from "assets/teeths/primary/11-red.png";
import twelveRed from "assets/teeths/primary/12-red.png";
import thirteenRed from "assets/teeths/primary/13-red.png";
import fourteenRed from "assets/teeths/primary/14-red.png";
import fifthteenRed from "assets/teeths/primary/15-red.png";

type PrimaryTeethChartProps = {
  form: any;
  teethType: string;
};

const firstQuadrant = [
  { value: 1, image: first, checkedImage: firstRed },
  { value: 2, image: second, checkedImage: secondRed },
  { value: 3, image: third, checkedImage: thirdRed },
  { value: 4, image: fourth, checkedImage: fourthRed },
  { value: 5, image: fifth, checkedImage: fifthRed },
];

const secondQuadrant = [
  { image: first, checkedImage: firstRed, value: 6 },
  { image: second, checkedImage: secondRed, value: 7 },
  { image: third, checkedImage: thirdRed, value: 8 },
  { image: fourth, checkedImage: fourthRed, value: 9 },
  { image: fifth, checkedImage: fifthRed, value: 10 },
];

const thirdQuadrant = [
  { image: eleven, checkedImage: elevenRed, value: 11 },
  { image: twelve, checkedImage: twelveRed, value: 12 },
  { image: thirteen, checkedImage: thirteenRed, value: 13 },
  { image: fourteen, checkedImage: fourteenRed, value: 14 },
  {
    image: fifthteen,
    checkedImage: fifthteenRed,
    value: 15,
  },
];

const fourthQuadrant = [
  { image: eleven, checkedImage: elevenRed, value: 16 },
  { image: twelve, checkedImage: twelveRed, value: 17 },
  { image: thirteen, checkedImage: thirteenRed, value: 18 },
  { image: fourteen, checkedImage: fourteenRed, value: 19 },
  {
    image: fifthteen,
    checkedImage: fifthteenRed,
    value: 20,
  },
];

const PrimaryTeethChart: React.FC<PrimaryTeethChartProps> = ({
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
    if (teethType !== "pediatric") {
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
              {...(teethType === "pediatric"
                ? register(`teethNums.${item.value}`)
                : {})}
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
              {...(teethType === "pediatric"
                ? register(`teethNums.${item.value}`)
                : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
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
              {...(teethType === "pediatric"
                ? register(`teethNums.${item.value}`)
                : {})}
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
              {...(teethType === "pediatric"
                ? register(`teethNums.${item.value}`)
                : {})}
              checked={teethNums.includes(item.value)}
              onChange={(checked: boolean) =>
                handleCheckboxChange(item.value, checked)
              }
              checkedImage={item.checkedImage}
              uncheckedImage={item.image}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PrimaryTeethChart;
