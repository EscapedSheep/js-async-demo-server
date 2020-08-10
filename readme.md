## How to use it

This repository is the backend API server. It exposes the following API:

|URI|METHOD|Payload|
|---|---|---|
|`api/message`|POST|`{ text, complexity, error }`. The `text` is the message you talked to the server. The `complexity` will determine how many seconds to delay before sending the response back. If `error` is `true` then the response status code will be 500, otherwise the status code will be 200.|

To run the server. Please enter the following command in your terminal (or PowerShell in Windows).

```bash
$ npm install
$ npm start
```

You can change `npm` to `cnpm` to download packages from Ali mirror.

The server will listen to port 3000 by default. To stop the server, press `Ctrl+C`.