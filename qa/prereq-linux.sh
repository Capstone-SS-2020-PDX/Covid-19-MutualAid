#!/bin/bash

# Requires Make installed...
# echo "$(tput setaf 1)Log $(tput setab 7)Red text and white background$(tput sgr 0)"


if [ $(id -u) != "0" ]; then
echo "$(tput setaf 1)Log $(tput setab 7)You must be the super user to run this script$(tput sgr 0)" >&2
exit
fi
echo "$(tput setaf 2)Log: Beginning make install part 1 ...$(tput sgr 0)"
echo "Running apt-get update and installing postgres, docker and npm..."
apt-get update >/dev/null 2>&1
apt-get -y install postgresql >/dev/null 2>&1
apt-get -y install docker >/dev/null 2>&1
apt-get -y install docker-compose >/dev/null 2>&1
apt-get -y install npm >/dev/null 2>&1

echo "$(tput setaf 1)Log: Now run the following command if you want to run docker as non-root user:$(tput sgr 0)"
echo 'sudo usermod -aG docker $USER'
echo 'You will need to log out and back in, then docker should work as not root'
echo "Afterwards, run make install2 to finish prerequisites"
echo "$(tput setaf 2)Log: Ending make install part 1 ...$(tput sgr 0)"