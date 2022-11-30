
# DHARAM DIGITAL

Problem: 
1. Create expressjs app listening on port 5002.

2. Create connection with mongodb server with mongoose.

3. Create users collection in mongodb which should be used for storing user credentials in structure of your choice.

4. Create login endpoint at /api/login which should accept username and password and make user login through session. You may use in memory storage for sessions or may also use redis for storing sessions.

5. Add middleware in expressjs app that protected paths starting with /api/admin. Paths starting with /api/admin should be accessible only to logged in users.

6. Create campaigns collection to store following information about each campaign : id, short_token, name, offers (array), enabled (boolean). Each object in offers array should contain following information : offer_url, ratio_percentage. Note that, short_token field should have unique index defined.

7. Create new endpoint /api/redirect which should accept short_token in query parameter, use it to find campaign. If campaign is not found or not enabled, serve error accordingly. If campaign is matched and enabled, redirect user to appropriate offer_url found from offers array. Please note that incoming valid requests should be distributed in manner that ratio_percentage mentioned in offer object is maintained. Before redirection, replace macro {click_id} if present in offer_url with value received in click_id query parameter.

8. Create api endpoint at /api/admin/campaigns/:id/toggle which should enable or disable campaign with its _id.

9. When process exists gracefully or due to any error, make sure to close mongodb client connection and close express http server.

#APIs

* POST/register
* POST/api/login
-- credential:
1)username
2)password
* POST/campaign
* GET/api/redirect
* PUT/api/admin/campaigns/:id/toggle


# Follow the Below Steps

Clone the project

git clone https://github.com/sonawanesn210/DharamDigital.git


Install dependencies(express,mongoose,express-session,valid-url,nodemon)
simply by npm i



And finally open your Terminal and type: npm start



## 🔗 Contact
If you want to contact me, you can reach me through below handles
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swapnali-sonawane-7a8886238/)
[![github](https://img.shields.io/badge/github-1DA1F2?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sonawanesn210)

