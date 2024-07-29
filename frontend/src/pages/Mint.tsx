import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Select,
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
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useMint from "../hooks/useMint";
import usePinFileToIPFS from "../hooks/usePinFileToIPFS";
import useGetAllCollections from "../hooks/useGetAllCollections";
import { urlFromIpfsHash } from "../utils";

interface MintForm {
  name: string;
  description: string;
  file: File;
  collection: string;
  price: number;
}

const MintPage: FC = () => {
  const { data: collections } = useGetAllCollections();

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = useForm<MintForm>();

  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: pinFileToIPFS, isPending: isPendingPinFileToIPFS } =
    usePinFileToIPFS();

  const { mutate: mintNft, isPending: isPendingMintNft } = useMint();

  const onSubmit = handleSubmit((data) => {
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
        mintNft(
          {
            cltId: data.collection,
            nftName: data.name,
            cid: res.data.IpfsHash,
            description: data.description,
            price: data.price,
          },
          {
            onSuccess: () => {
              toast({
                colorScheme: "purple",
                title: "NFT Minted",
                description: "Your NFT has been minted successfully!",
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
                description: "There was an error minting the NFT",
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
              <FormControl isInvalid={!!errors.collection}>
                <FormLabel color="gray.600">Collection</FormLabel>
                <Controller
                  name="collection"
                  control={control}
                  render={({ field }) => (
                    <HStack w="100%" justify="space-between">
                      <Select
                        {...field}
                        color="gray.300"
                        placeholder="Choose your NFT's collection..."
                        boxShadow="lg"
                        border={`1px solid ${colors.gray[700]}`}
                      >
                        {collections?.map((collection) => (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        ))}
                      </Select>
                      {!!collections?.find((c) => c.id === field.value) && (
                        <Box w="50px">
                          <Image
                            borderRadius="8px"
                            h="40px"
                            src={urlFromIpfsHash(
                              collections?.find((c) => c.id === field.value)
                                ?.logo ?? ""
                            )}
                          />
                        </Box>
                      )}
                    </HStack>
                  )}
                />
                {errors.collection && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel color="gray.600">Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  color="gray.300"
                  placeholder="Enter your NFT's name..."
                  boxShadow="lg"
                  border={`1px solid ${colors.gray[700]}`}
                />
                {errors.name && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
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
                {errors.description && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.price}>
                <FormLabel color="gray.600">Price</FormLabel>
                <Input
                  {...register("price", { required: true })}
                  maxW="300px"
                  color="gray.300"
                  placeholder="Enter the price of the NFT..."
                  boxShadow="lg"
                  type="number"
                  border={`1px solid ${colors.gray[700]}`}
                />
                {errors.price && (
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
              isLoading={isPendingPinFileToIPFS || isPendingMintNft}
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
