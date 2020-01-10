# WECT-PoC
A Proof of Concept to try and use data from a SharePoint list to drive an application.

This application uses "Application Permissions" as opposed to "Delegated Permissions" in Azure AD.

## Configure and run the app
1. Create the file **config.js** in the root directory using **config.js.example** as a template.
2. Replace *ENTER_YOUR_CLIENT_ID* with the client ID of your registered Azure application.
3. Replace *ENTER_YOUR_SECRET* with a key generated on the **Configure** page of your app in the Microsoft Azure Management Portal.
4. Replace *ENTER_YOUR_TOKEN_ISSUING_ENDPOINT* with the *OAuth 2.0 token endpoint* value found by clicking the **View Endpoints** button in the Azure Management Portal.
5. Replace *ENTER_YOUR_SITE_ID* with your ID of the site where your list resides.
6. Replace *ENTER_YOUR_LIST_ID* with the ID of the list you wish to extract the data from.
7. Replace the values for *filePath*, *fileName*, *fileLife* as required.
8. Run `npm install` to install the app's dependencies. 
9. Run `npm start` to run the app.

  > Note: This app will extract the data from the list and save it in a file specified by the *filePath* and *fileName*. It also extracts column data, removing any unwanted columns from the json
