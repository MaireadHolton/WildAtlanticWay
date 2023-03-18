# **myWildAtlantic Way**

This is a Hapi Web app which allows users to store details of visits to Discovery points along the Wild Atlantic Way.

## **Structure**

The api folder in src contains files to connect the Node.js app to the mongo database:

 *jwt-utils.js:*
contains the functions for creating a jwt token for each user, docoding tokens and validating a user account

*list-api.js:*
contains functions for finding all user lists, finding a single user defined list, creating a new list, deleting a list and deleting all lists under a a user account

*location-api.js:*
contains functions for finding all user locations, finding a single user defined location, creating a new location, deleting a location and deleting all locations under a a user account

*logger.js:*
contains a function to log an error to the console if there is a validation error

*user-api.js:*
contains functions for finding all users, finding a single user, creating a new user, deleting all users and authenticating a user


The controllers folder in src contains all of the javascript files used for controlling the app:

*about-controller.js:*
Sets the content of the about view

*accounts-controller.js:*
Contains methods for user signup (returns error when information is entered in the incorrect format), user login (redirects to login when information is entered in the incorrect format), logout and user validation.

*community-controller.js:*
Sets the content of the community view

*dashboard-controller.js:*
Contains methods for displaying a logged in users dashboard, adding a new list under the users account and deleting a lidt under the users account

*list-controller.js:*
Contains methods for displaying each list under a users account, for adding a location inside a list folder, for deleting a location inside a list folder and for uploading an image inside a list

*location-controller.js:*
Contains method for showing all of the locations inside a list and for updating locations in a list

The models folder in src contains the classes for modelling the User, List and Location objects in json, javascript and mongo formats:

*list-json-store.js/ list-mem-store.js/ list-mongo-store.js:*
Contain models for getting all created lists, finding lists by id, adding a list, finding a users lists, deleting a list, deleting all lists and updating a list 

*location-json-store.js/ location-mem-store.js/ location-mongo-store.js:*
Contain models for getting all created locations, adding a location, finding a location with a list, finding a location by id, deleting a single location, deleting all locations and updating a location 

*user-json-store.js/ user-mem-store.js/ user-mongo-store.js:*
Contain models for getting all created users, adding a user, finding a user by id, finding a user by email adress, deleting a single user by id and deleting all users

*connect.js:*
contains a function to seed the database with information contained in seed-data.js and a function to connect to the database using mongoose. Also contains methods to display connection and error details to the console

*db.js:*
contains methods to send data to the database and define the data store type

*image-store.js:*
contains methods for connecting to the cloudinary service to get images stored on the database through this service, upload images and delete images

*joi-schemas.js:*
contains definistions for defining the user spec, the list object spec and the location spec. Alse defines the spec for jwt authentication


### **Design**

The views folder in src contains hbs files for defining the display elements of the app. UI elements are used throughout the app. Layouts are defined by layout.hbs which calls the stylesheet from builma.css and  the script from fontawesome.com.

*about-view.hbs:*
contains the view setup for the about tab in the app, displays some text and an image

*community-view.hbs:*
contains the view setup for the community tab in the app, contains links to facebook and instagram for social media posting

*dashboard-view.hbs:*
contains the view setup for the dashboard tab in the app, calls the partials add-list and list-lists

*list-view.hbs:*
contains the view setup for user lists, calls the partials list-locations, add-location and list-image

*login-view.hbs:*
contains the view setup for the login screen in the app, contains field for email and password and a submit button

*main.hbs:*
contains the view setup for the main homescreen on starting the app, displays some text and an image

*signup-view.hbs:*
contains the view seetup for the signup screen in the app. Contains fields for first name, lastname, email and password and also a submit button

partials:
 *add-list.hbs:*
 contains the partial for the add list form to allow a user to add the name of a new list and a button to add this list

 *add-location.hbs:*
 contains the partial for the add a location form with fields to enter the details associated with the location i.e. location name, latitude, longitude, date visited and any details about the location, and a button to add the location

 *error.hbs:*
 an error partial to display text when an error is encountered

 *list-image.hbs:*
partial to display the image uploaded to cloudinary inside a list folder, contains a button to choose a file and an upload button to add the image

 *list-lists.hbs:*
partial to display the form for each list title with a file open button and a trash button to delete the list

 *list-locations.hbs:*
a partial to display the locations stored in a list, with a trash button to delete a location from a list

 *menu.hbs:*
partial to display the menu bar across the top of the app on each page, contains a buttone for the dashboard, the about tab, the community tab and a logout tab

 *welcome-menu.hbs:*
partial to display the welcome menu with buttons to either signup or login 

 *WildAtlanticWay-brand.hbs:*
a partial to set the style for the app logo on the upper left of the page

The src folder also contains:

*api-routes.js:*
contains the HTTP paths associated with the api files

*web-routes.js:*
contains the HTTP paths associated with the controller files

*server.js:*
import of all packages required for the app and server setup

#### **Testing:**

The test folder contains javascript files used to run tests on the api and models of the app using the fixtures.js file.

*api-tests:*
auth-api-test.js  <br>
tests to check that the API authentication files are working as expected. Checks that a user can be created and authenticated, that the jwt token for a new user is verifiable and that the authentication is cleared when a user is deleted  <br>

list-api-test.js:  <br>
tests to check that the API list files are working as expected. Checks that a list can be created and deleted, multiple lists can be created and to make sure the system returns an error if a non-existant list is deleted  <br>

location-api-test.js:  <br>
tests to check that the API location files are working as expected. Checks that a location can be created and deleted, multiple locations can be created and to make sure the system doesn't cause an error if there are no locations in the database  <br>

user-api-test.js:  <br>
tests to check that the API user files are working as expected. Checks that a user can be created and deleted, a user can be found and to make sure the system returns an error if someone tries to find a non-existant or delted user  <br>

*model-tests:*
list-model-test.js:  <br>
tests to check that the model list files are working as expected. Checks that a list is created and deleted as expected, that all lists are deleted, that a list can be found by id and that an error is returned if a non-existant list is searched for or deleted  <br>

location-model-test.js:  <br>
tests to check that the model location files are working as expected. Checks that a location is created and deleted as expected, that all locations are deleted, that multiple locations are created, that a location can be found by id and that an error is returned if a non-existant location is searched for or deleted  <br>

user-model-test.js:  <br>
tests to check that the model user files are working as expected. Checks that a user is created and deleted as expected, that all users are deleted, that a user can be found by email or id and that an error is returned if a non-existant user is searched for or deleted  <br>

##### **Elements employed:**

I have employed hapi Node.js framework to build the app. I have employed tests to ensure that both the API and models are working as expected. I have employed swagger to create swagger documentation to describe the API structure in the app. I have employed JWT for security purposes to verify users. I have employed mongoose for creating a connection between my app and the mongo database. I have employed cloudinary.com to allow users to upload images.

###### **Deployment:**
I have deployed my app on Render: https://mywildatlanticway2.onrender.com

###### **Sources:**
[image upload] https://cloudinary.com/documentation/how_to_integrate_cloudinary
[weather api] https://weatherwidget.org/



