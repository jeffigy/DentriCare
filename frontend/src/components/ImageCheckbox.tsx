import { Box, useCheckbox } from "@chakra-ui/react";

type ImageCheckboxProps = {
  checkedImage: string;
  uncheckedImage: string;
  reverse?: boolean;
};

const ImageCheckbox: React.FC<ImageCheckboxProps> = ({
  checkedImage,
  uncheckedImage,
  reverse,
  ...props
}) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        as="img"
        src={input.checked ? checkedImage : uncheckedImage}
        style={{
          transform: reverse ? "scaleX(-1)" : "scaleX(1)",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default ImageCheckbox;
