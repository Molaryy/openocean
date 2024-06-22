export default [
  {
    id: 0,
    name: "NFT 1",
    image:
      "https://i.seadn.io/gcs/files/a07fdcc050dbff6b337afec68d7eee37.png?auto=format&dpr=1&h=500",
    price: "0.1",
    owner: "0x1234",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.   Nullam nec purus nec nunc tincidunt tincidunt.   Nullam nec purus nec nunc tincidunt tincidunt.",
    transactions: [
      {
        event: "Mint",
        price: "0.1",
        from: "0x1234",
        to: "0x5678",
        timestamp: "2021-10-01T00:00:00Z",
      },
    ],
  },
  {
    id: 1,
    name: "NFT 2",
    image:
      "https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1",
    price: "0.2",
    owner: "0x5678",
    description: "This is a description of the NFT",
    transactions: [
      {
        event: "Mint",
        price: "0.1",
        from: "0x1234",
        to: "0x5678",
        timestamp: "2021-10-01T00:00:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "NFT 3",
    image:
      "https://i.seadn.io/s/raw/files/244ed6dd289a6ab8c971941096467637.gif?auto=format&dpr=1&h=500",
    price: "0.2",
    owner: "0x5678",
    description: "This is a description of the NFT",
    transactions: [
      {
        event: "Mint",
        price: "0.1",
        from: "0x1234",
        to: "0x5678",
        timestamp: "2021-10-01T00:00:00Z",
      },
    ],
  },
];
