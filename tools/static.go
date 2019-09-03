package main

import "net/http"

func main() {
	http.ListenAndServe(":8003", http.FileServer(http.Dir("./")))
}
