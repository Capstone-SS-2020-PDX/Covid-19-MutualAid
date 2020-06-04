.PHONY: server js

server:
	docker-compose build && docker-compose up

js:
	cd react-native && expo start

console:
	docker exec -it djapi bash

deploy:
	bash qa/deploy.sh
