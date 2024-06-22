import { FC } from "react";
import { HStack, Button, Icon } from "@chakra-ui/react";
import HomeButton from "../molecules/HomeButton";
import WalletButton from "../molecules/ConnectButton";
import { GiGoldBar } from "react-icons/gi";
import { MdOutlineBarChart } from "react-icons/md";

const Header: FC = () => (
  <HStack
    width="100%"
    height="64px"
    bg="gray.900"
    spacing={0}
    justify="space-between"
    userSelect="none"
    p="24px"
    boxShadow="lg"
  >
    <HomeButton />
    <WalletButton />
    <HStack spacing="12px">
      <Button flexDir="column" variant="primary">
        <Icon as={GiGoldBar} fontSize="24px" />
        <span style={{ fontSize: "12px" }}>Mint</span>
      </Button>
      <Button flexDir="column" variant="primary">
        <Icon as={MdOutlineBarChart} fontSize="24px" />
        <span style={{ fontSize: "12px" }}>Stats</span>
      </Button>
    </HStack>
  </HStack>
);

export default Header;
