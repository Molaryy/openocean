import { FC } from "react";
import { HStack } from "@chakra-ui/react";
import HomeButton from "../molecules/HomeButton";
import WalletButton from "../molecules/ConnectButton";
import { GiGoldBar } from "react-icons/gi";
import { MdOutlineBarChart } from "react-icons/md";
import NavButton from "../molecules/NavButton";
import HeaderContainer from "../atoms/HeaderContainer";

const Header: FC = () => (
  <HeaderContainer>
    <HomeButton />
    <WalletButton />
    <HStack spacing="24px">
      <NavButton path="/mint" icon={GiGoldBar} label="Mint" />
      <NavButton path="/stats" icon={MdOutlineBarChart} label="Stats" />
    </HStack>
  </HeaderContainer>
);

export default Header;
