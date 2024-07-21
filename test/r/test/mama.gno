package test

import (
	"gno.land/p/demo/ufmt"
)

func Test(count int) int {
	c := 0
	for range count {
		c += 1
	}
	ufmt.Println("Count = ", c)
	return c
}
