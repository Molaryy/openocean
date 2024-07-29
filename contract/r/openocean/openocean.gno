package openr

import (
	"std"
	"errors"
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
	"gno.land/p/molaryy/openocean"
	"gno.land/p/demo/json"
)

const (
	openoceanAdr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
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
	description string,
	logo string,
	avaiableNfts int,
) {
	caller := std.GetOrigCaller()
	coinSent := std.GetOrigSend()
	banker := std.GetBanker(std.BankerTypeOrigSend)
	realmAddr := std.CurrentRealm().Addr()

	if coinSent.AmountOf("ugnot") < 5 {
		panic(errors.New("You don't have enough founds to create a collection, it costs 5 ugnots and you have " + string(coinSent.AmountOf("ugnot")) + " ugnots"))
	}
	clt, err := openocean.CreateCollection(
		collectionCounter,
		&nftID,
		name,
		symbol,
		caller,
		description,
		logo,
		avaiableNfts,
	)
	if clt == nil || err != nil {
		panic(err)
	}
	banker.SendCoins(realmAddr, openoceanAdr, std.Coins{coinSent[0]})
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
				"price": json.NumberNode("price", float64(nft.GetPrice())),
			})
			cltField.AppendObject(nft.GetId(), nftField)
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
	collectionID string,
	nftName string,
	cid string,
	description string,
	price int64,
) bool {
	clt, ok := openocean.GetCollectionByID(collections, collectionID)
	caller := std.GetOrigCaller()

	if ok == false {
		panic(errors.New("Couldn't find collection: " + collectionID))
	}
	if caller != clt.GetOwner() {
		panic(errors.New("You are not the owner of the collection"))
	}
	return clt.Mint(nftName, cid, description, caller, price)
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

	nfts := clt.GetNFTS()
	collectionJSON := json.ObjectNode("", map[string]*json.Node{
		"id": json.StringNode("id", clt.GetId()),
		"name": json.StringNode("name", clt.GetName()),
		"logo": json.StringNode("logo", clt.GetLogo()),
		"volume": json.StringNode("volume", string(clt.GetAvaiableTokens())),
		"sales": json.StringNode("sales", string(clt.GetNFTSBought())),
	})

	nfts.Iterate("", "", func (id string, value interface{}) bool {
		nft := value.(* openocean.NFTtoken721)
		nftJSON := json.ObjectNode("", map[string]*json.Node{
			"id": json.StringNode("id", nft.GetId()),
			"name": json.StringNode("name", nft.GetName()),
			"metadata": json.StringNode("metadata", nft.GetMetadata()),
			"price": json.StringNode("price", string(nft.GetPrice())),
		})
		collectionJSON.AppendObject(nft.GetId(), nftJSON)
		return false
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
