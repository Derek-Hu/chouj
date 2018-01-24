## How to start mock server
* Configure the port and api prefix of mock server by modify `mock/package.json` attribute `mockConfig`.

```json
"mockConfig": {
  "port": 3005,
  "prefix": "/api/v2"
},
```
* Add mock implements in folder `mock/modules`, the mock server will dynamic load those files.

Run command:

```sh
npm run mock

```
Open url [http://localhost:3005/api/v2/user](http://localhost:3005/api/v2/user)
