package openocean

import (
	"gno.land/p/demo/avl"
	"gno.land/p/demo/ufmt"
	"gno.land/p/molaryy/openocean"
)

var (
	collections avl.Tree
	collectionCounter int
)

func init() {
	collectionCounter = 0
}

func AddCollection(
	addrOwner string,
	description string,
	logo string
) {
	collectionCounter++
	idStr := ufmt.Sprintf("%d", collectionCounter)
	clt := CreateCollection(idStr, addrOwner, description, logo)
    collections.Set(idStr, clt)
	ufmt.Println("Collection ", idStr, " created successfully!")
}

func Render(path string) string {
	str := ""

	collections.Iterate("", "", func(id string, value interface{}) bool {
		clt := GetCollectionByID(collections, id)
		str += "## Collection\n"
		str += "ID: " + clt.GetID() + "\n"
		str += "Owner: " + clt.GetOwner() + "\n"
		str += "Description: \"" + clt.GetDescription() + "\"\n"
		str += "Logo: " + clt.GetLogo() + "\n\n"
		return false
	})
	return str
}
