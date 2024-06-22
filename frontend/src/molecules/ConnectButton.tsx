import { HStack, StackDivider, Button, useToast, Text } from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";
import { AdenaService } from "../services/adena/adena";
import { IAccountInfo } from "../services/adena/adena.types";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { displayBalance } from "../utils";

const WalletButton: FC = () => {
  const toast = useToast();
  const { setChainID, setAddress } = useAccountStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [accountInfo, setAccountInfo] = useState<IAccountInfo | null>(null);

  const fetchBalance = async () => {
    const accountInfo = await AdenaService.getAccountInfo();
    setAccountInfo(accountInfo);
  };

  const ugnots = useMemo<number>(() => {
    if (!accountInfo) return 0;
    return +accountInfo.coins.split("u")[0];
  }, [accountInfo]);

  const handleWalletConnect = async () => {
    setIsLoading(true);

    try {
      // Attempt to establish a connection
      await AdenaService.establishConnection("meme.land");

      // Get the account info
      const info: IAccountInfo = await AdenaService.getAccountInfo();

      // Make sure the network is valid
      await AdenaService.switchNetwork(constants.chainID);

      // Update the account context
      setAddress(info.address);
      setChainID(constants.chainID);

      await fetchBalance();

      toast({
        colorScheme: "purple",
        title: "Connected to Adena",
        description: `Connected to ${info.address}`,
        status: "success",
        duration: 5000,
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
      borderRadius="16px"
      border="1px solid gray"
      px="12px"
      _hover={{ background: "gray.800" }}
      transition="1s"
      divider={<StackDivider />}
    >
      {!!accountInfo && <Text>{displayBalance(ugnots)}</Text>}
      <Button
        _hover={{ color: "purple.100" }}
        color="purple.200"
        onClick={handleWalletConnect}
        isLoading={isLoading}
        isDisabled={!!accountInfo}
      >{`{ wallet }`}</Button>
    </HStack>
  );
};

export default WalletButton;
