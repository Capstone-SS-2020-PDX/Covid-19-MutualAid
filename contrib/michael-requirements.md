# Comments/Questions/Knowns/Unknowns


* How to ensure user safety within the app
   * Control access to address/location data
   * Monitoring posts for inappropriate content
   * Have a report system, but who monitors that?
* If we have communities that are created and can be joined (to side-step using direct location data), how do we handle ensuring users are actually in those communities, and handle duplicate communities
* Setting ourselves apart
   * Craigslist
      * Have user profiles to eliminate anonymity
      * Rating system to help build trust
   * Nextdoor
      * Our app isn’t exactly a social media platform
         * Can’t just post “because”, requires a “have” or a “need”
      * Won’t have to browse through rants and gossip
      * Make the UI more store-like to emphasize this?
   * Freecycle, etc.
      * Glorified “Free” section on craigslist
      * Our user profiles and community building aspect should set us apart well enough, similar to Craigslist points
* Help build communities
   * Since most people aren’t active parts of their community, the app should have a section that helps them build one
      * Advice for creating a community garden
      * Advice for communicating with neighbors effectively
         * Not making things quid pro quo, etc.
* Problematic users:
   * There may be people who just want free things, without actually being in need. How should this be handled, if we handle it at all?
   * Don’t like the idea of means-testing, but leechers could be a problem




# Technical Aspects


* I’ve personally never done mobile development, so I’m not sure what questions/concerns to have here
* Do we use geolocation data or self-reported location? How are these stored and displayed?
   * I don’t like how the example app gives out location data so easily
* Do we include the chatbot or not? How closely do we plan to follow IBM’s architecture?
* Deployment:
   * I think we should start locally, distribute the apk to local groups first, then once we’re sure it can handle regular use, can put it on the app stores
