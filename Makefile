.PHONY: server js console deploy install install2 build-droid build-ios

# Default target: Run expo server
js:
	cd react-native && expo start

# Build and run the docker instance for django & postgres
server:
	docker-compose build && docker-compose up

# Enter into the docker instance running the django server
console:
	docker exec -it djapi bash

# Deploy the application
deploy:
	qa/deploy.sh

# Install general dependencies needed for app
install:
	sudo bash qa/prereq-linux.sh

# Install app-specific packages
install2:
	sudo bash qa/prereq-linux2.sh

# Build android apk
build-droid:
	cd react-native && expo build:android -t apk

# Build iOS tarball (for emulators)
build-ios:
	cd react-native && expo build:ios