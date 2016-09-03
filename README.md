#Dashboard

Prerequisite - Please run the API server. From folder api, command -

npm install
node index.js

To install the application, command -

npm install

To run the application, command -

grunt serve

The application can be accessed from http://0.0.0.0:9000

The spinner wheel indecates the content is loading as the users API is slow.

In case the users API returns 500, it shows an error message.

The header part is a mock-up done from the wireframe. The search functionality was out of scope of this prototype.

The program information is static, assuming this prototype is done for one single programme.

This project has #No. users - lists the number of users available in the API.

In the 'Latest Content' section, the 'My content' tab shows the 'live' files which has live : true
This is an attempt to categorize the contents under 'My content' based on assumption.

The 'All' tab shows all files available in the API.

The 'Published' tab shows files with a status: Published

By default, only 5 files are shown. 'View all content' button shows all available files for that category.

The right hand navigation lists all available 'Types' as mock links. The API provided had only 2 'types'.
I've added data in the API for the rest of the 'types' to keep it consistent with the wireframe design provided.
The number in the bracekets show the number of documents available for that type.

The icons are taken from fontawesome, with assumptions where any particular image couldn't been located.

The application is built in AngularJS.

The unit tests are written in Jasmine and Karma is used as a test runner.
The coverage/report-html/index.html file shows the test coverage report, which is 100%.