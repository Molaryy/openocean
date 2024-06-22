import { HStack, StackDivider, Button, useToast, Text } from "@chakra-ui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { AdenaService } from "../services/adena/adena";
import { IAccountInfo } from "../services/adena/adena.types";
import { constants } from "../constants";
import { useAccountStore } from "../store";

const WalletButton: FC = () => {
  const toast = useToast();
  const { setChainID, setAddress, address } = useAccountStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isConnected = useMemo(
    () => !!address && "adena" in window && !!window.adena,
    [address]
  );

  const [accountInfo, setAccountInfo] = useState<IAccountInfo | null>(null);

  useEffect(() => {
    if (!isConnected) return;

    const fetchBalance = async () => {
      const accountInfo = await AdenaService.getAccountInfo();
      setAccountInfo(accountInfo);
    };

    fetchBalance();
  }, [isConnected]);

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

      toast({
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
      color="white"
      divider={<StackDivider />}
    >
      {!!isConnected && <Text>{accountInfo?.coins}</Text>}
      <Button
        onClick={handleWalletConnect}
        isLoading={isLoading}
        isDisabled={isConnected}
      >{`{ wallet }`}</Button>
    </HStack>
  );
};

export default WalletButton;
