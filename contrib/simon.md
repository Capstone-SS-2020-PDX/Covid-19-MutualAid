# Comments/Questions/Knowns/Unknowns

### GitHub boards video
I absolutely love GitHub boards, those integrations and such should work perfectly for our project.

### Scrumban video
* I like the guy's guide, I like the WIP item limit, forces teammates to check in and help out.
* I like the columns on his board: 'To Do', 'Ready', 'Dev', 'Ready to Test', 'Testing', 'Done'
* I like not doing hour estimating (story points), just focus on prioritizing work.

Let's do it! We can get started on Thurs with research tasks and possibly some dev tasks already.
As soon as we start, we'll figure out what works and what doesn't.

## Conceptual Overview of Covid Mutual Aid
I'm thinking the vision will follow Michael's original mock up where users are not necessarily seeing an endless feed like most social platforms. Simply enter your needs and/or offers and the app will do the matching and notifying. Seems similar conceptually to the [starter kit repo](https://github.com/Call-for-Code/Solution-Starter-Kit-Cooperation-2020), but much more functionality.

Most of my initial research led me off the rails in thinking of amitious feature ideas. My favorite is connecting drivers (recently unemployed?) with opportunities for food rescue. Partner with Oregon food bank? And other 501c3 orgs to encourage volunteers and food supplier donations? I really think mobilizing communities to help with the broken food system could be a powerful standout feature, but it would require *a lot* of extra work on our end. Emd result could be cool though. Perhaps, user profiles get special 'hero' badges for volunteering? This is a huge conversation and maybe too much. Narrow scope is probably best, and we can add as things go and have a solid product.

General Comments
* Bruce's requirement doc seems reasonable.
* Profile and rating seems good. (Can only get upvotes? Or star rating?)
  * Tracking rating and number of interactions, good.
* Moderation seems like the hard part. Putting a lot on community admins.
* There are other apps that do similar things. I think we can make something better.

Questions
* What is the actual vision we want to design? (Forum style, social feed, limited UI?).Requirement doc leaves this open and could go in many directions in my mind.
* Do we want to allow *real* money to be exchanged??
* Does anyone know when the IBM challenge actually ends in relation to Capstone timeline? Or are we officially signing up for the IBM challenge?
* How is geolocation managed? This is a huge requirement to unpack. (I'm thinking users initially see a rough distance, e.g. 'milk is 0.3 miles away' offer, then if accepted they see exact spot?) I'm not entirely sure.
* Agreements are accepted by both parties. Then how is the delivery specified?
  * Do we want users to chat? Or has the 'giver' or 'taker' agreed to do the trip ahead of time?
* Admins have one way communication through app? Send warnings, send ban hammer then offending users can follow up through email? Or, again, chat system?

#### Question for Bruce
* How should we go about the legal aspect of this? User agreement, safety policy? Food safety? Can just about anything be covered in a user agreement?
  * Although food donation legality seems lenient
    * [Good Samaritan Food Donation Act](https://www.law.cornell.edu/uscode/text/42/1791)
    > "...excluding donor liability except in cases of gross negligence or intentional misconduct"

# Technical
I do not know much about React or mobile development generally, but the IBM thing gives us a starter kit (and an entire architecture?), and React is what I researched. Seems like a great framework that could cover the whole project. I will admit that I have only made extremely basic iOS 9 apps long ago.

I'm not entirely sure how we might proceed with a test framework or designing features, but if we decide on something specific like React at the 4/30/20 meeting, we can start diving in to figure those things out. Folks seemed to have written about these things. Also, React's documentation is superb so basically memorize that.