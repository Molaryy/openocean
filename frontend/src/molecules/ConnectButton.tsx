import { HStack, StackDivider, Button, useToast, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AdenaService } from "../services/adena/adena";
import { IAccountInfo } from "../services/adena/adena.types";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { displayUgnot } from "../utils";

const WalletButton: FC = () => {
  const toast = useToast();
  const { setAddress, setAccountInfo, accountInfo, balance, setBalance } =
    useAccountStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWalletConnect = async () => {
    setIsLoading(true);

    try {
      // Attempt to establish a connection
      await AdenaService.establishConnection("openocean");

      // Get the account info
      const info: IAccountInfo = await AdenaService.getAccountInfo();

      // Make sure the network is valid
      await AdenaService.switchNetwork(constants.chainID);

      // Update the account context
      setAddress(info.address);
      setAccountInfo(info);
      setBalance(+info.coins.split("u")[0]);

      toast({
        colorScheme: "purple",
        title: "Connected to Adena",
        description: `Connected to ${info.address}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);

      toast({
        title: "Failed to connect to Adena",
        description: "Please make sure you have the Adena wallet installed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <HStack
      onClick={handleWalletConnect}
      borderRadius="16px"
      border="1px solid gray"
      px="12px"
      _hover={{ background: "gray.800" }}
      transition="1s"
      divider={<StackDivider />}
    >
      {!!accountInfo && <Text>{displayUgnot(balance)}</Text>}
      <Button
        _hover={{ color: "purple.100" }}
        color="purple.200"
        isLoading={isLoading}
        isDisabled={!!accountInfo}
      >{`{ wallet }`}</Button>
    </HStack>
  );
};

export default WalletButton;
