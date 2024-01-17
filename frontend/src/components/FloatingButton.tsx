import { IconButton, Icon } from "@chakra-ui/react";
import React from "react";

import { Link } from "react-router-dom";

type FloatingButtonProps = {
  to: string;
  ariaLabel: string;
  icon: any;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  to,
  ariaLabel,
  icon,
}) => {
  return (
    <IconButton
      as={Link}
      size={"lg"}
      isRound={true}
      aria-label={ariaLabel}
      icon={<Icon as={icon} />}
      sx={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
      }}
      to={to}
    />
  );
};
export default FloatingButton;
