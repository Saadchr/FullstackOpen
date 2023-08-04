sequenceDiagram
User->>Client: Types in input & clicks submit
Client->>Server: POST request with the content of Input
Client->>Server: GET request for /notes
Server->>Client: Sends HTML document
Browser->>Client: Refresh the page
Client->>Server: GET request for main.css
Server->>Client: Sends CSS file
Client->>Browser: Renders CSS
Client->>Server: GET request for main.js
Server->>Client: Sends the main.js file
Browser->>Client: Starts executing JS
Browser->>Server: GET request for data.json via the form submit
Server->>Client: Sends JSON data
Browser->>Client: Calls callback function to render JSON
Browser->>Client: Render the JSON and reload the page with a redirect
