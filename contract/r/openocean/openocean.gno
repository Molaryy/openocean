package openr

import (
	"std"
	"errors"
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
	collectionID string,
	nftName string,
	cid string,
	description string,
) bool {
	clt, ok := openocean.GetCollectionByID(collections, collectionID)
	caller := std.GetOrigCaller()

	if ok == false {
		panic(errors.New("Couldn't find collection: " + collectionID))
	}
	if caller != clt.GetOwner() {
		panic(errors.New("You are not the owner of the collection"))
	}
	return clt.Mint(nftName, cid, description, caller)
}

func BuyNFT(collectionID string, nftID string) {
	caller := std.GetOrigCaller()
	clt, ok := openocean.GetCollectionByID(collections, collectionID)
	coinSent := std.GetOrigSend()
	banker := std.GetBanker(std.BankerTypeOrigSend)
	realmAddr := std.CurrentRealm().Addr()

	if ok == false {
		panic(errors.New("Couldn't find collection: " + collectionID))
	}
	
	nft, ok := clt.GetNFTByID(nftID)

	if ok == false {
		panic(errors.New("Couldn't find an nft with this iD"))
	}
	if nft.GetOwner() == caller {
		panic(errors.New("You already have this nft: " + nftID))
	}
	if nft.GetPrice() > coinSent.AmountOf("ugnot") {
		panic(errors.New("You don't have enough ugnots to buy the nft: " + nftID))
	}

	clt.IncreateNFTSBought()
	nft.SetOwner(caller)
	banker.SendCoins(realmAddr, clt.GetOwner(), std.Coins{coinSent[0]})
}

func GetCollectionStats(collectionID string) string {
	clt, ok := openocean.GetCollectionByID(collections, collectionID)

	if ok == false {
		panic(errors.New("Couldn't find collection: " + collectionID))
	}

	collectionJSON := json.ObjectNode("", map[string]*json.Node{
		"id": json.StringNode("id", clt.GetId()),
		"name": json.StringNode("name", clt.GetName()),
		"logo": json.StringNode("logo", clt.GetLogo()),
		"volume": json.StringNode("volume", string(clt.GetAvaiableTokens())),
		"sales": json.StringNode("sales", string(clt.GetNFTSBought())),
	})

	encoded, err := json.Marshal(collectionJSON)

	if err != nil {
		panic(err)
	}
	return string(encoded)
}

func Render(path string) string {
	return GetCollections()
}
