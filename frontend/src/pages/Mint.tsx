import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";
import SingleUploadImage from "../molecules/SingleUploadImage";
import { colors } from "../theme";
import { GiGoldBar } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface MintForm {
  name: string;
  description: string;
  supply: number;
  file: File;
}

const MintPage: FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MintForm>();

  const watchFile = watch("file");

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    toast({
      colorScheme: "purple",
      title: "NFT Minted",
      description: "Your NFT has been minted successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  });

  return (
    <VStack align="start" w="100%" h="100%" spacing="32px">
      <Text userSelect="none" fontSize="32px">
        Mint a new NFT
      </Text>
      <Stack
        flexDir={{
          base: "column",
          lg: "row",
        }}
        alignItems="stretch"
        w="100%"
        h="100%"
        spacing="48px"
        minW="300px"
      >
        <SingleUploadImage
          w={{ base: "100%", lg: "40%" }}
          h={{ base: "100px", lg: "100%" }}
          bg="blackAlpha.500"
          _hover={{ bg: "gray.900" }}
          transition="0.5s"
          borderRadius="12px"
          onUpdateFile={(file: File) => setValue("file", file)}
        />
        <chakra.form onSubmit={onSubmit} w="100%" h="100%">
          <VStack w="100%" justify="space-between" h="100%">
            <VStack maxW="800px" w="100%" spacing="24px">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color="gray.600">Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  color="gray.300"
                  placeholder="Enter your NFT's name..."
                  boxShadow="lg"
                  border={`1px solid ${colors.gray[700]}`}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel color="gray.600">Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  color="gray.300"
                  placeholder="Enter your NFT's description..."
                  boxShadow="lg"
                  border={`1px solid ${colors.gray[700]}`}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.supply}>
                <FormLabel color="gray.600">Supply</FormLabel>
                <Input
                  {...register("supply", { required: true })}
                  maxW="300px"
                  color="gray.300"
                  placeholder="Enter your NFT's supply..."
                  boxShadow="lg"
                  type="number"
                  border={`1px solid ${colors.gray[700]}`}
                />
              </FormControl>
            </VStack>
            <Button
              isDisabled={!watchFile}
              type="submit"
              p="64px"
              fontWeight="black"
              fontSize="32px"
              gap="12px"
            >
              Mint
              <Icon as={GiGoldBar} />
            </Button>
          </VStack>
        </chakra.form>
      </Stack>
    </VStack>
  );
};

export default MintPage;
