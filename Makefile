BINDIR    := node_modules/.bin
BUILD_DIR := public
PORT      := 3000

help:
				@echo
				@echo "  \033[34minstall\033[0m – install goes and gets the required dependencies"
				@echo "  \033[34mstart\033[0m – starts the server on :3000"
				@echo "  \033[34clean\033[0m - clean files"
				@echo

start:
				yarn
				gulp

install:
				yarn

clean:
				rm -r node_modules


