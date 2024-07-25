package openocean

import (
	"std"
	"testing"
	"errors"

	"gno.land/p/demo/json"
)


func TestInitNft(t *testing.T) {
	{
		var adr std.Address = "hello world!"
		_, err := InitToken(adr, "0")
		expectedErr := errors.New("Invalid owner address")

		if err == nil {
			t.Fatalf("expected %s, got %s", expectedErr, err)
		}
	}
	{
		var adr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
		initNft, err := InitToken(adr, "0")

		if err != nil {
			t.Fatal(err)
		}

		expectedId := "0"
		id := initNft.GetId()

		if id != expectedId {
			t.Fatalf("expected %s, got %s", expectedId, id)
		}	
	}
	{
		var adr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
		initNft, err := InitToken(adr, "1")

		if err != nil {
			t.Fatal(err)
		}

		gotAdr := initNft.GetOwner()

		if gotAdr != adr {
			t.Fatalf("expected %s, got %s.", adr.String(), gotAdr.String())
		}
	}
	{
		var adr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
		initNft, err := InitToken(adr, "2")

		if err != nil {
			t.Fatal(err)
		}

		gotMinted := initNft.IsMinted()

		if gotMinted != false {
			t.Fatalf("expected %t, got %t.", false, gotMinted)
		}
	}
}

func TestMintNft(t *testing.T) {
	{
		var adr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
		var nwAdr std.Address = "g199esk77thuk3lhzz2ktmkgffk7d9eh7hn0kmqt"
		nft, err := InitToken(adr, "3")

		if err != nil {
			t.Fatal(err)
		}


		isMinted := nft.IsMinted()

		if isMinted {
			t.Fatalf("expected false, got true")
		}

		nft.Mint("Pablo", "test", "hey everyone", nwAdr)
		expectedIsMinted := true
		expectedOwner := nwAdr
		expectedName := "Pablo"
		expectedMetadata := json.ObjectNode("", map[string]*json.Node{
			"owner": json.StringNode("owner", nwAdr.String()),
			"name": json.StringNode("name", "Pablo"),
			"ipfsUrl": json.StringNode("ipfsUrl", "test"),
			"description": json.StringNode("description", "hey everyone"),
		})

		if expectedIsMinted != nft.IsMinted() {
			t.Fatalf("expected true, got false")
		}
		
		if expectedOwner != nft.GetOwner() {
			t.Fatalf("expected %s, got %s", expectedOwner.String(), nft.GetOwner().String())
		}

		if expectedName != nft.GetName() {
			t.Fatalf("expected %s, got %s", expectedName, nft.GetName())
		}

		encodedExpectedMetadata, err := json.Marshal(expectedMetadata)

		if err != nil {
			t.Fatal(err)
		}
		strEncodedExpectedMetadata := string(encodedExpectedMetadata)
		if strEncodedExpectedMetadata != nft.GetMetadata() {
			t.Fatalf("expected %s, got %s", strEncodedExpectedMetadata, nft.GetMetadata())
		}
	}
}

func TestOwnerNft(t *testing.T) {
	{
		{
			var adr std.Address = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
			var nwAdr std.Address = "g199esk77thuk3lhzz2ktmkgffk7d9eh7hn0kmqt"
			nft, err := InitToken(adr, "4")
	
			if err != nil {
				t.Fatal(err)
			}
	
			gotAdr := nft.GetOwner()

			if gotAdr != adr {
				t.Fatalf("expected %s, got %s.", adr.String(), gotAdr.String())
			}

			ok := nft.SetOwner(nwAdr)

			if ok == false {
				t.Fatal("There was an error when trying to set a new owner")
			}

			gotAdr = nft.GetOwner()
			if gotAdr != nwAdr {
				t.Fatalf("expected %s, got %s.", nwAdr.String(), gotAdr.String())
			}
		}
	}
}
