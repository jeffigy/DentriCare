import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      LandingPage
      <Box position="fixed" bottom={8} right={8}>
        <Menu
          variant={"roundLeft"}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <MenuButton
            rounded={"full"}
            as={IconButton}
            icon={<CiSquarePlus />}
            onClick={handleToggleMenu}
          />
          <MenuList>
            <MenuItem onClick={() => console.log("Option 1 clicked")}>
              Option 1
            </MenuItem>
            <MenuItem onClick={() => console.log("Option 2 clicked")}>
              Option 2
            </MenuItem>
            {/* Add more MenuItem components as needed */}
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
};
export default LandingPage;
