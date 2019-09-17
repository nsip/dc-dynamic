package main

import "net/http"
import "fmt"

func main() {
	fmt.Print("Static server started. http://localhost:8003/\n")
	http.ListenAndServe(":8003", http.FileServer(http.Dir("./")))
}
