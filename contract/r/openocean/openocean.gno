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
	cltsJson := json.ArrayNode("", []*json.Node{})


	collections.Iterate("", "", func (id string, value interface{}) bool {
		ufmt.Println("Collection ID: ", id)
		clt := value.(*openocean.Collection)
		if clt == nil {
			return true
		}
		nfts := clt.GetNFTS()
		nftsJson := json.ArrayNode("", []*json.Node{})
		cltField := json.ObjectNode("", map[string]*json.Node{
			"id": json.StringNode("id", clt.GetId()),
			"name": json.StringNode("name", clt.GetName()),
			"logo": json.StringNode("logo", clt.GetLogo()),
			"owner": json.StringNode("owner", clt.GetOwner().String()),
			"description": json.StringNode("description", clt.GetDescription()),
		})
		nfts.Iterate("", "", func (id string, valueNft interface{}) bool {
			nft := valueNft.(* openocean.NFTtoken721)
			nftField := json.ObjectNode("", map[string]*json.Node{
				"id": json.StringNode("id", nft.GetId()),
				"owner": json.StringNode("owner", nft.GetOwner().String()),
				"isMinted": json.BoolNode("isMinted", nft.IsMinted()),
			})
			metadata := nft.GetMetadata()
			if metadata != "" {
				metadataJson, err := json.Unmarshal([]byte(metadata))
				if err != nil {
					panic(err)
				}
				nftField.AppendObject("metadata", metadataJson)
			}
			nftsJson.AppendArray(nftField)
			return false
		})
		cltField.AppendObject("nfts", nftsJson)
		cltsJson.AppendArray(cltField)
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
