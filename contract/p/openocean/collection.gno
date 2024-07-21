package openocean

import (
	"std"
	"errors"
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
)

type Collection struct {
	id string
	name string
	symbol string
	addrOwner std.Address
	description string
	logo string // ipfs path
	avaiableTokens int
	owners *avl.Tree
	nfts avl.Tree
}

var (
	idNft int
	collectionCounter int
)

func init() {
	idNft = 0
	collectionCounter = 0
}

func (n *Collection) BalanceOf(owner std.Address) (uint64, bool) {
	var blc uint64 = 0

	n.nfts.Iterate("", "", func (id string, value interface{}) bool {
		nft := value.(*NFTtoken721)
		if nft.GetOwner() == owner {
			blc++
		}
		return false
	})
	if blc > 0 {
		return blc, true
	}
	return blc, false
}

func (n *Collection) OwnerOf(tokenId string) (std.Address, bool) {
	var owner std.Address
	found := false

	n.nfts.Iterate("", "", func (id string, value interface{}) bool {
		nft := value.(*NFTtoken721)
		if tokenId == id {
			owner = nft.GetOwner()
			found = true
			return true
		}
		return false
	})
	return owner, found
}

func (n *Collection) SafeTransferFrom(
	from std.Address,
	to std.Address,
	tokenId int,
)  {
	// TODO
}

func (n *Collection) SafeTransferFromWithData(
	from std.Address,
	to std.Address,
	tokenId int,
	data string,
) {
	// TODO
}

func (n *Collection) TransferFrom(
	from std.Address,
	to std.Address,
	tokenId int,
) {
	// TODO
}

func (n *Collection) Approve(to std.Address, tokenId int) {
	// TODO
}

func (n *Collection) GetApproved(tokenId int) {
	// TODO
}

func (n *Collection) SetApprovalForAll(operator std.Address, _approved std.Address) {
	// TODO
}

func (n *Collection) IsApprovedForAll(owner std.Address, operator std.Address) {
	// TODO
}

func (c *Collection) GetId() string {
	return c.id
}

func (c *Collection) GetOwner() std.Address {
	return c.addrOwner
}

func (c *Collection) GetDescription() string {
	return c.description
}

func (c *Collection) GetLogo() string {
	return c.logo
}

func (c *Collection) GetNFTS() avl.Tree {
	return c.nfts
}

func (c *Collection) getAvailableNFT() (*NFTtoken721, bool) {
	var nft *NFTtoken721
	var found bool = false

	c.nfts.Iterate("", "", func(id string, n interface{}) bool {
		nft = n.(*NFTtoken721)

		if nft.IsMinted() == false {
			found = true
			return true
		}
		return false
	})
	return nft, found
}

func (c *Collection) Mint(
	name string,
	ipfsUrl string,
	description string,
	owner std.Address,
) bool {
	if c.avaiableTokens <= 0 {
		ufmt.Println("Collection hasn`t any available tokens")
		return false
	}
	c.avaiableTokens -= 1
	nft, found := c.getAvailableNFT()

	if found == false {
		ufmt.Println("There are no more available nfts")
		return false
	}
	nft.Mint(name, ipfsUrl, description, owner)
	return true
}

func GetCollectionByID(clts avl.Tree, idToFind string) *Collection {
	value, exists := clts.Get(idToFind)

	if exists == false {
		ufmt.Println("Couldn't find collection with ID: ", idToFind)
		return nil
	}
	return value.(*Collection)
}

func CreateCollection(
	name string,
	symbol string,
	addrOwner std.Address,
	description string,
	logo string,
	avaiableTokens int,
) (*Collection, error) {
	var nfts avl.Tree

	if addrOwner.IsValid() == false {
		return nil, errors.New("Invalid owner address")
	}
	ufmt.Println("Available tokens: ", avaiableTokens)
	for range avaiableTokens {
		idN := ufmt.Sprintf("%d", idNft)
		tkn, err := InitToken(addrOwner, idN)
		if err != nil {
			panic(err)
		}
		nfts.Set(idN, tkn)
		idNft++
	}
	idClt := ufmt.Sprintf("%v", collectionCounter)
	collectionCounter++
	return &Collection{
		id: idClt,
		name: name,
		symbol: symbol,
		addrOwner: addrOwner,
		description: description,
		logo: logo,
		avaiableTokens: avaiableTokens,
		owners: avl.NewTree(),
		nfts: nfts,
	}, nil
}
