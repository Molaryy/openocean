package openr

import (
	"std"
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
	"gno.land/p/molaryy/openocean"
	"gno.land/p/demo/json"
)


var (
	collections *avl.Tree
	collectionCounter int
	nftID int
)

func init() {
	collections = avl.NewTree()
	nftID = 0
	collectionCounter = 0
}

var count int

func AddCollection(
	name string,
	symbol string,
	addrOwner std.Address,
	description string,
	logo string,
	avaiableNfts int,
) {
	clt, err := openocean.CreateCollection(
		collectionCounter,
		&nftID,
		name,
		symbol,
		addrOwner,
		description,
		logo,
		avaiableNfts,
	)
	if clt == nil || err != nil {
		panic(err)
	}
	id := clt.GetId()
    collections.Set(id, clt)
	ufmt.Println("Collection: (", id, ") created successfully!")
	collectionCounter++
}


func GetCollections() string {
	cltsJson := json.ObjectNode("", map[string]*json.Node{})


	collections.Iterate("", "", func (id string, value interface{}) bool {
		ufmt.Println("Collection ID: ", id)
		clt := value.(*openocean.Collection)
		if clt == nil {
			return true
		}
		nfts := clt.GetNFTS()
		cltField := json.ObjectNode("", map[string]*json.Node{
			"id": json.StringNode("id", clt.GetId()),
			"logo": json.StringNode("logo", clt.GetLogo()),
			"owner": json.StringNode("owner", clt.GetOwner().String()),
			"description": json.StringNode("description", clt.GetDescription()),
			"nfts": json.ObjectNode("", map[string]*json.Node{}),
		})
		nfts.Iterate("", "", func (id string, value interface{}) bool {
			nft := value.(* openocean.NFTtoken721)
			nftField := json.ObjectNode("", map[string]*json.Node{
				"id": json.StringNode("id", nft.GetId()),
				"owner": json.StringNode("owner", nft.GetOwner().String()),
				"metadata": json.StringNode("metadata", nft.GetMetadata()),
				"isMinted": json.BoolNode("isMinted", nft.IsMinted()),
			})
			cltField.AppendObject("nft", nftField)
			return false
		})
		cltsJson.AppendObject("", cltField)
		return false
	})
	encoded, err := json.Marshal(cltsJson)

	if err != nil {
		panic(err)
	}
	return string(encoded)
}

func MintInCollectionById(
	cltId string,
	nftName string,
	ipfsUrl string,
	description string,
	owner std.Address,
) bool {
	clt := openocean.GetCollectionByID(collections, cltId)

	if clt == nil {
		return false
	}
	return clt.Mint(nftName, ipfsUrl, description, owner)
}

func Render(path string) string {
	return GetCollections()
}
