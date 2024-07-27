import {
  VStack,
  Stack,
  FormControl,
  FormErrorMessage,
  chakra,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  Text,
  useToast,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { FC } from "react";
import SingleUploadImage from "../molecules/SingleUploadImage";
import { colors } from "../theme";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../store";
import usePinFileToIPFS from "../hooks/usePinFileToIPFS";
import useCreateCollection from "../hooks/useCreateCollection";
import { FaPlusSquare } from "react-icons/fa";

interface CreateCollectionForm {
  file: File;
  name: string;
  symbol: string;
  description: string;
  supply: number;
}

const CreateCollection: FC = () => {
  const { address } = useAccountStore();

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CreateCollectionForm>();

  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: pinFileToIPFS, isPending: isPendingPinFileToIPFS } =
    usePinFileToIPFS();
  const { mutate: createCollection, isPending: isPendingCollectionCreation } =
    useCreateCollection();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.file) {
      setError("file", { message: "This field is required" });
      return;
    }
    pinFileToIPFS(data.file, {
      onSuccess: (res) => {
        toast({
          colorScheme: "purple",
          title: "Image uploaded",
          description: "Your image has been uploaded successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        createCollection(
          {
            name: data.name,
            symbol: data.symbol,
            addrOwner: address!,
            description: data.description,
            logo: res.data.IpfsHash,
            avaiableNfts: data.supply,
          },
          {
            onSuccess: () => {
              toast({
                colorScheme: "purple",
                title: "NFT Collection created",
                description:
                  "Your NFT Collection has been created successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              navigate("/");
            },
            onError: () => {
              toast({
                colorScheme: "red",
                title: "Error",
                description: "There was an error creating the NFT Collection",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            },
          }
        );
      },
      onError: () => {
        toast({
          colorScheme: "red",
          title: "Error",
          description: "There was an error uploading the image to IPFS",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  });

  return (
    <VStack align="start" w="100%" h="100%" spacing="32px">
      <Text userSelect="none" fontSize="32px">
        Create a new NFT Collection
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
        <FormControl isInvalid={!!errors.file}>
          <SingleUploadImage
            w="100%"
            h={{ base: "100px", lg: "100%" }}
            maxH="70vh"
            bg="blackAlpha.500"
            _hover={{ bg: "gray.900" }}
            border={errors.file ? "1px solid red" : undefined}
            transition="0.5s"
            borderRadius="12px"
            onUpdateFile={(file: File) => {
              setValue("file", file);
              clearErrors("file");
            }}
          />
          {errors.file && (
            <FormErrorMessage>An image is required</FormErrorMessage>
          )}
        </FormControl>
        <chakra.form onSubmit={onSubmit} w="100%" h="100%">
          <VStack w="100%" justify="space-between" h="100%">
            <VStack maxW="800px" w="100%" spacing="24px">
              <SimpleGrid columns={3} w="100%" gap="24px">
                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel color="gray.600">Name</FormLabel>
                    <Input
                      {...register("name", { required: true })}
                      color="gray.300"
                      placeholder="Enter your collection's name..."
                      boxShadow="lg"
                      border={`1px solid ${colors.gray[700]}`}
                    />
                    {errors.name && (
                      <FormErrorMessage>
                        This field is required
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </GridItem>
                <FormControl isInvalid={!!errors.symbol}>
                  <FormLabel color="gray.600">Symbol</FormLabel>
                  <Input
                    {...register("symbol", { required: true })}
                    color="gray.300"
                    placeholder="$NFT"
                    boxShadow="lg"
                    border={`1px solid ${colors.gray[700]}`}
                  />
                  {errors.symbol && (
                    <FormErrorMessage>This field is required</FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel color="gray.600">Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  color="gray.300"
                  placeholder="Enter your collection's description..."
                  boxShadow="lg"
                  border={`1px solid ${colors.gray[700]}`}
                />
                {errors.description && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.supply}>
                <FormLabel color="gray.600">Supply</FormLabel>
                <Input
                  {...register("supply", { required: true })}
                  maxW="300px"
                  color="gray.300"
                  placeholder="Enter number of NFTs to mint..."
                  boxShadow="lg"
                  type="number"
                  border={`1px solid ${colors.gray[700]}`}
                />
                {errors.supply && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
            <Button
              type="submit"
              p="64px"
              fontWeight="black"
              fontSize="32px"
              gap="12px"
              isLoading={isPendingPinFileToIPFS || isPendingCollectionCreation}
            >
              Create
              <Icon as={FaPlusSquare} />
            </Button>
          </VStack>
        </chakra.form>
      </Stack>
    </VStack>
  );
};

export default CreateCollection;
