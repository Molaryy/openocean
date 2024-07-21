package openocean

import (
	"std"
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
	"gno.land/p/molaryy/openocean"
	"gno.land/p/demo/json"
)

var (
	collections avl.Tree
)

func MintToCollectionID(
	id string,
	name string,
	ipfsUrl string,
	description string,
) bool {
	clt := openocean.GetCollectionByID(collections, id)

	if clt == nil {
		return false
	}
	clt.Mint(name, ipfsUrl, description, clt.GetOwner())
	return true
}

func AddCollection(
	name string,
	symbol string,
	addrOwner std.Address,
	description string,
	logo string,
	avaiableNfts int,
) {
	clt, err := openocean.CreateCollection(
		name,
		symbol,
		addrOwner,
		description,
		logo,
		avaiableNfts,
	)
	if err != nil || clt == nil {
		panic(err)
	}
	id := clt.GetId()
    collections.Set(id, clt)
	ufmt.Println("Collection: (", id, ") created successfully!")
}

func GetCollections() string {
	cltsJson := json.ObjectNode("", map[string]*json.Node{})


	collections.Iterate("", "", func (id string, value interface{}) bool {
		clt := value.(*openocean.Collection)
		if clt == nil {
			return true
		}
		var nfts avl.Tree = clt.GetNFTS()
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
		cltsJson.AppendArray(cltField)
		return false
	})
	encoded, err := json.Marshal(cltsJson)

	if err != nil {
		panic(ufmt.Errorf("error: %v", err))
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
	str := ""

	collections.Iterate("", "", func(id string, value interface{}) bool {
		clt := value.(*openocean.Collection)
		str += "### Collection"
		str += "<br/>"
		str += "<img src=\"" + clt.GetLogo() + "\" alt=\"drawing\" width=\"200\" style=\"border-radius:50%;width:40px;height:40px\"/>"
		str += "<br/>"
		str += "**ID**: " + clt.GetId()
		str += "<br/>"
		str += "**Owner**: " + clt.GetOwner().String()
		str += "<br/>"
		str += "**Description**: \"" + clt.GetDescription() + "\""
		str += "<br/>"
		str += "<br/>"
		str += "---"
		return false
	})
	return str
}
