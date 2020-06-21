.PHONY: server js

server:
	docker-compose build && docker-compose up

js:
	cd react-native && expo start

console:
	docker exec -it djapi bash

deploy:
	bash qa/deploy.sh

install:
	sudo bash qa/prereq-linux.sh

install2:
	sudo bash qa/prereq-linux2.sh
