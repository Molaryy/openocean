package openocean

import (
	"std"
	"errors"
	"gno.land/p/demo/ufmt"
	"gno.land/p/demo/json"
)

type NFTtoken721 struct {
	id string
	name string
	owner std.Address
	metadata string
	isMinted bool
	price int64
}

func (n *NFTtoken721) GetId() string {
	return n.id
}

func (n *NFTtoken721) GetName() string {
	return n.name
}

func (n *NFTtoken721) GetOwner() std.Address {
	return n.owner
}

func (n *NFTtoken721) GetMetadata() string {
	return n.metadata
}

func (n *NFTtoken721) GetPrice() int64 {
	return n.price
}

func (n *NFTtoken721) SetOwner(owner std.Address) bool {
	if owner.IsValid() == false {
		return false
	}
	n.owner = owner
	return true
}

func (n *NFTtoken721) IsMinted() bool {
	return n.isMinted
}

func (n *NFTtoken721) Mint(
	name string,
	cid string,
	description string,
	owner std.Address,
	price int64,
) bool {
	if n.isMinted == true {
		ufmt.Println("NFT: ", n.id, " has already been minted!")
		return false
	}
	nftJson := json.ObjectNode("", map[string]*json.Node{
		"owner": json.StringNode("owner", owner.String()),
		"name": json.StringNode("name", name),
		"cid": json.StringNode("cid", cid),
		"description": json.StringNode("description", description),
	})

	encoded, err := json.Marshal(nftJson)

	if err != nil {
		panic(err)
	}
	n.metadata = string(encoded)
	n.isMinted = true
	n.owner = owner
	n.name = name
	n.price = price
	return true
}

func InitToken(
	addrOwner std.Address, 
	nftId string,
) (*NFTtoken721, error) {
	if addrOwner.IsValid() == false {
		return nil, errors.New("Invalid owner address")
	}
	return &NFTtoken721 {
		id: nftId,
		name: "",
		owner: addrOwner,
		metadata: "",
		isMinted: false,
	}, nil
}
