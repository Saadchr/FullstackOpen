sequenceDiagram
Client->>Server: GET request at https://studies.cs.helsinki.fi/exampleapp/spa
Server->>Client: Sends HTML document
Client->>Server: GET request for main.css
Server->>Client: Sends CSS file
Client->>Browser: Renders CSS
Client->>Server: GET request for main.js
Server->>Client: Sends the main.js file
Browser->>Client: The browser executes the JS file
Client->>Server: GET request for JSON file
Client->>Browser: GET request for JS file at chrome..extension
Browser->>Client: A JS file is executed, preparing the Event
Client->>Server : GET requests for CSS file
Server->>Client: Sends CSS file
Client->>Browser: Renders CSS
