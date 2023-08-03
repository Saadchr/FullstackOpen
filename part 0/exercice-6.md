sequenceDiagram
Client->>Server: Post Request at https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Server->>Client: Respond with a status, with no redirect
Brower->>Client: Calls the JS file, not refreshing the page, calls the event handler, renders the page with the "internal" JSON
Client->> Server: Sends the new Note to the server as a JSON asynchronously
