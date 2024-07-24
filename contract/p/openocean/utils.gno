package openocean

import "std"

const (
	ownerAddr = "g125fhetg9kc3surkxh78avppegc3997l3jr4wdf"
)

func IsOwner(addr std.Address) bool {
	if addr.String() == ownerAddr {
		return true
	}
	return false
}
