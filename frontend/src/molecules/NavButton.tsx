import { Button, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  path: string;
  icon: IconType;
  label: string;
}
const NavButton: FC<NavButtonProps> = ({ path, icon, label }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)} flexDir="column" variant="primary">
      <Icon as={icon} fontSize="32px" />
      <span style={{ fontSize: "14px" }}>{label}</span>
    </Button>
  );
};

export default NavButton;
