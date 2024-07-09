package openocean

import (
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
)

type Collection struct {
	id string
	addrOwner string
	description string
	logo string // ipfs path
	nfts avl.Tree
}

func (c *Collection) GetId() string {
	return c.id
}

func (c *Collection) GetOwner() string {
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

func GetCollectionByID(clts avl.Tree, idToFind string) *Collection {
	value, exists := clts.Get(idToFind)

	if exists == false {
		ufmt.Println("Couldn't find collection with ID: ", idToFind)
		return nil
	}
	return value.(*Collection)
}

func CreateCollection(
	id string,
	addrOwner string,
	description string,
	logo string,
) *Collection {
	return &Collection{
		id: id,
		addrOwner: addrOwner,
		description: description,
		logo: logo,
		nfts: [],
	}
}
