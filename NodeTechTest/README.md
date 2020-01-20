# Node Tech Test
## Tasks to complete
### Part 1
In the provided node project, write the function getMatchedCampaigns in node.js that calls the async function getCampaigns() which has the following response:
```JavaScript
[{
    'matched': 'false',
    'campaignId': '321',
    'experiences': [{
	'experienceId': '234',
	'experienceName': 'Home Page',
	'personalisation': '...',
	'createdDate': '2019-12-25T00:00:00.000Z'
    }, {
	'experienceId': '432',
	'experienceName': 'Contact Us',
	'personalisation': '...',
	'createdDate': '2020-01-12T00:00:00.000Z'
    }]
}, {
    'matched': 'true',
    'campaignId': '389',
    'experiences': [{
	'experienceId': '678',
	'experienceName': 'About Us',
	'personalisation': '...',
	'createdDate': '2020-01-13T00:00:00.000Z'
    }, {
	'experienceId': '542',
	'experienceName': 'Contact Us',
	'personalisation': '...',
	'createdDate': '2020-01-14T00:00:00.000Z'
    }]
}]
```

Exclude any objects in the array where the matched property is false, and return a dictionary object, with campaignId as the ID and the most recently created experience as the value. e.g.
```JavaScript
{
    '389': {
	experienceId: 678,
	personalisation: '...',
	createdDate: '2020-01-14T00:00:00.000Z'
    } ...
}
```
Ensure to include any unit tests that you think necessary and use the features available to you in node 10.

> Method created: <code>.\services\campaignService.js</code>
```JavaScript
  async getMatchedCampaigns() {
        // Part 1 Here
        return await new Promise((resolve) => {
            this.getCampaigns().then(function (data) {
                resolve(
                    JSON.parse(data).filter((el) => {
                        return el.matched.toLowerCase() == 'true';
                    }).map(obj => {
                        let rObj = {}
                        rObj[obj.campaignId] = obj.experiences.reduce((prev, current) => (prev.createdDate > current.createdDate) ? prev : current);
                        return rObj
                    })
                );
            }, function (error) {
                reject({'status':0,'error': error });
            });
        });
    }
```


**_NOTE_**:
There is a mistake in provided example, as it should return this:
```JavaScript
{
    '389': {
	'experienceId': '542',
	'experienceName': 'Contact Us',
	'personalisation': '...',
	'createdDate': '2020-01-14T00:00:00.000Z'
    } ...
}
```
As <code>'experienceId': '678'</code> has date <code>'createdDate': '2020-01-13T00:00:00.000Z'</code> which is less than <code>'createdDate': '2020-01-14T00:00:00.000Z'</code>

### Part 2
Create an endpoint GET <code>/campaigns/matched</code> using express that calls the <code>getMatchedCampaigns</code> function and returns the output.

> Endpoint created: <code>http://localhost:1337/campaigns/matched</code>

**Bonus created:**
> Extra endpoint created: <code>http://localhost:1337/campaigns/all</code>

### Part 3
Create a vue app with a page. Add a button to the page, which when clicked gets the response from the endpoint <code>GET /campaigns/matched</code>. Display the experienceName and experienceId for each experience that is returned.

> Vue.js page created: <code>http://localhost:1337/vuejs</code>

**Bonus created:**
> AngularJS page created: <code>http://localhost:1337/angularjs</code>

## App dependencies
This app was written using Visual Studio 2019 Community edition and basic Azure Node.js app with JavaScript template.

The list of npm packages used in this sample app:

Package | Version
------------ | -------------
node.js | 10.15.3
npm | 6.4.1
body-parser | 1.19.0
chai | 3.5.0
chai-http | 2.0.1
cokie-parser | 1.4.4
debug | 2.6.9
express | 4.17.1
mocha | 2.5.3
morgan | 1.9.1
pug (ex. jade) | 2.0.4
serv-favicon | 2.5.0

## App structure
This visual studio sulution is organised by following structure:
* **npm packages/node modules** - local npm package repository
* **public** - assets for an app:
  * **images** - image assets for an app:
  * **javascripts** - js assets for an app:
  * **stylesheets** - css assets for an app:
* **routes** - express routes:
  * **angularjs** - express server route for AngularJS page
  * **index** - default/home express server route for default/home page
  * **react** - express server route for React page
  * **users** - express server route for dummy users page
  * **vuejs** - express server route for Vue.js page
* **services** - services:
  * **CampaignService** - dummy Campaign service for an app
* **test** - mocha test directory:
  * **test.js** - mocha test cases  
* **views** - pug views page:
  * **angularjs** - AngularJS pug view page
  * **error** - Error pug view page
  * **index** - Default/home pug view page
  * **layout** - Default layout template for pug pages
  * **react** - React pub view page
  * **vuejs** - Vue.js pub view page
* **index.js** - Node app
* **package.json** - app npm packages and other configuration
* **README.md** - This readme file with all the details
* **Web.config** - node app config for IIS/Express IIS on LIVE/PRODUCTION
* **Web.Debug.config** - node app config for IIS/Express IIS on DEV with debugging features

## Running
To run this app just type this on node.js console (with the assumption that you are at root directory):

<code>node index</code>
or (this will launch procedures from package.json)
<code>npm start</code>

## Testing
To test this app just type this on node.js console (with the assumption that you are at root directory):
<code>npm test</code>
(this will launch procedures from package.json)

## Licesing
This solution is licensed under ISC (Internet Software Consortium).


