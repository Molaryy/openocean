import { HStack, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BsEasel } from "react-icons/bs";

const Logo: FC = () => (
  <HStack>
    <Icon as={BsEasel} fontSize="24px" color="purple.200" />
    <Text color="purple.200" fontFamily="heading" fontWeight="semibold">
      OpenOcean
    </Text>
  </HStack>
);

export default Logo;
