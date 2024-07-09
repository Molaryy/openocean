package openocean

const (
	ownerAddr = "g1zry05elmetdftwclp2urcxcaty6hh0wgd05lds"
)

func IsOwner(addr string) bool {
	if addr == ownerAddr {
		return true
	}
	return false
}
