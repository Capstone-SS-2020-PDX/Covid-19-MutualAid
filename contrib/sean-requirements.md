# High-Level Description

## Potential Models:

- Community:
  - Members
  - Admins
  - Listings
  - Forum
  - Rating
- Member:
  - Communities
  - Listings
  - Messages
  - Status
  - Basic information (name, email, phone, etc)
  - Social media integration?
  - Rating
  - Is private
  - Is admin
- Listing:
  - Owner
  - Recipient
  - Payment [optional?]
  - Type
  - Tags
  - Description
  - Community
  - Is fulfilled
- Forum:
  - Posts
  - Type [category?]
  - Tags

## Features

As a user (community member), I can:
- Login, view, and edit my profile
- View site dashboard
- View, join communities
- Search for goods within communities
- Offer goods to communities via a listing or post
- Post a question to a community
- Rate a community or user (1-5)
- Filter through goods and services

As a community manager, I can:
- [inherit user features]
- Request to create, edit, and delete communities (and their content)
- Answer forum posts
- Monitor goods and services exchanged between communities / users
- Moderate users (more of a responsibility than a feature?)
- Nominate other admins

As a site admin, I can:
- Create / edit / delete anything on site (admin privileges)
- Approve community manager actions

Other potential features:
- Geolocation of user creation (verify they are in community area)
- Potentially create a request system for users to request to be community
  managers -- somehow vet this process
- Detailed backlog of what goods and services users and communities have
  provided
- Chatbot
- In-app messaging between users, communities (aside from forums)

## Technical Requirements

### Frontend
React Native frontend
- Allows for Android/IOS native app creation
- Great frontend framework

### Backend
Flask (Python)
- Asynchronous, small framework
- Easy to learn, easy to use

Django (Python)
- Large suite of features
- Not asynchronous

node.js
- Ease of development, not switching languages
- From IBM Communtiy tutorial

### Database
Relational databases are realiable and easy to use, but we could also use use
nosql or something similar

## Questions & Comments
- Geolocation, user creation & tracking geolocation can get pretty hairy in
  terms of privacy, consent, etc.
- Social media integration would be awesome, with python there are some great
  packages that allow for this kind of thing (flask-social or django-auth on pypi)

