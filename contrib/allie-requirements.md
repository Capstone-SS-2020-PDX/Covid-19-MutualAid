# Suggested Requirements

Author:     Allie Hanson  
Updated:    April 29, 2020

This document contains my suggested requirements and specifications for the COVID-19-MutualAid project.

## High-Level Overview

### Suggested Requirements

1. Users must create an account in order to view appropriate listings for nearby aid.
    * Related Question 1: Is there anything we can do to perform some kind of identity verification?
    * Related Question 2: Is there a way to have account creation linked to Google or Facebook accounts? Is there some kind of verification process *we* would have to go through to do this, or is this easily integratable? (Something to look in to).
    * It would be nice for users to have the ability to upload a profile picture if they choose.
2. Users enter their home or current address (or specifically their general neighborhood, depending on what privacy measures we take), and this will "connect" them with other users within a certain geographic radius.
    * This connection could bring them to a list of nearby aid postings.
3. Users should have the ability to create a post for aid.
4. When creating a post, users would be provided a template to complete. 
    * This template might include fields like "item," "description,", "your name," etc.
    * If we do not require users to communicate via the app, then there might be an optional "contact" field.
5. Postings for aid should include both "need" and "have" features, so that users can express whether they require a certain item or service or have an excess supply of it.
6. Postings for aid should have a feature that allows users to mark it as "fulfilled."
    * "Fulfilled" postings should probably be removed from the master list and any search results.
7. Aid postings should have the ability to be categorized, e.g. as "food", "clothing", etc.
8. Users should have the ability to sort and/or search through aid postings to find things they have or need.
9. Some kind of manual moderation or automatic filtering on posts (or a combination of both) to prevent malicious or inappropriate content.
    * Related Question 1: Would any kind of request for payment be considered inappropriate on this app and thus filtered out? 

### General Questions

1. Do we want to include more community features aside from aid postings? (Perhaps this could be a stretch goal)?
2. How do we ensure the physical safety of our users? Or, does the responsibility to ensure physical safety not fall on us?
3. Could we include some kind of "rating" or user moderation so that bad-intentioned (or poorly behaved) individuals can be taken off of the app or face consequences?
4. Will there be an in-app communication feature -- comments, chat, etc.?

## Technical Aspects

Note: I have never built a mobile or web app before so I will default to the recommendations of those of you with more experience than me. Also, some of my thoughts below could be incorrect, so please feel free to correct me if you notice something that's inaccurate.

1. The IBM "Community cooperation" starter kit recommends using the React Native framework, Node.js environment, and the Cloudant database service (along with the Watson Assistant, but I don't know if we wanted to use a chatbot).
    * A tutorial can be found here: https://developer.ibm.com/tutorials/create-a-mobile-app-to-facilitate-community-collaboration/
    * As an alternative to React Native, we could use Express.js.
2. I think another alternative would be Django, and this might work well since I think many of us are already familiar with Python.
    * I found a comparison of Django and Node.js here: https://dashbouquet.com/blog/frontend-development/nodejs-vs-django-is-javascript-better-than-python, although of course this is somewhat subjective.
3. Ruby on Rails is another common web app framework. I don't know Ruby at all, so I'm not sure if this would be the best option -- I have just heard good things about it.
