import { HStack, StackDivider, Button, useToast, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { constants } from "../constants";
import { useAccountStore } from "../store";
import { displayUgnot } from "../utils";
import {
  establishConnection,
  getAccountInfo,
  switchNetwork,
} from "adena-sdk-ts";

const WalletButton: FC = () => {
  const toast = useToast();

  const { setAddress, balance, address, setBalance } = useAccountStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWalletConnect = () => {
    setIsLoading(true);

    establishConnection("openocean")
      .then(() =>
        switchNetwork(constants.chainID).then(() =>
          getAccountInfo().then((info) => {
            setAddress(info.address);
            setBalance(+info.coins.split("u")[0]);
            toast({
              colorScheme: "purple",
              title: "Connected to Adena",
              description: `Connected to ${info.address}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
        )
      )
      .catch((e) => {
        console.error(e);
        toast({
          title: "Failed to connect to Adena",
          description: "Please make sure you have the Adena wallet installed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
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
      {address !== null && <Text>{displayUgnot(balance)}</Text>}
      <Button
        _hover={{ color: "purple.100" }}
        color="purple.200"
        isLoading={isLoading}
        isDisabled={address !== null}
      >
        <span>{`{ wallet }`}</span>
      </Button>
    </HStack>
  );
};

export default WalletButton;
