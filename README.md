██████╗ ███╗   ██╗██████╗ 
██╔══██╗████╗  ██║██╔══██╗
██║  ██║██╔██╗ ██║██║  ██║
██║  ██║██║╚██╗██║██║  ██║
██████╔╝██║ ╚████║██████╔╝
╚═════╝ ╚═╝  ╚═══╝╚═════╝ 

Functionality expectations/ TODO

Home Page
-possibly an IP tracker that shows them a sort of error page if they aren't in canada

-The Main page will have a large Hero of 'Gamers of Dungeons and Dragons'

-Will have a component for current running games, just a number I think
-next will have a button for "request game" for club members that wish to join a game/get one created so that they may join

the following section will be a search inventory so that club members can see what books/models/items we currently have in the club locker

in that section, either navigate to a new page or have a drop down for "item Request" (idk about name)

here they would input their name, discord name (since communications are through the club discord) ,email (must be a nait email - see below for more notes), and the name of what they are requesting with necessary details on versions and what not

-email notes 
    Since we cannot validate the email itself(no access), we can possibly verify if the email contains "nait.ca" at the very least


In the top right of the page with be a button that will open either a modal window/dialog for login or route to another page for Login

The login is only available for Admins, with a section for demo purposes, so likely a separate or temp database where changes can be made but not saved?

the login functionality will likely run through a third party (Thanks Dan) - focus on this part last

Once through, the page will have a section to view current games

a game will have 
 -session Name
 -the Dungeon Master
 -the Players
 -format
 -When it runs (wednesday and/or friday)

This info can get edited:
-add or remove player
-change run day
-remove active game

The following section would track game requests (who is asking/ what format/what day)

INVENTORY SECTION

this section should track inventory addition requests from the main page
perhaps a section for request for funding made / club member contacted for details booleans 
then a complete request

next section would be a place to track current inventory (what is in the club locker)

-condition especially for these items, with a "Date Last Veryfied"

also a section to add to the current inventory

I would like the Database to be in prisma, but we can create a temp DB with basic information for creation and testing :)

