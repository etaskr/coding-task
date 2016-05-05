# Release Notes

## 06/05/2016 23:06:21
Initial version. 

It contains a working server and a working client. 

The client is a minimalistic one. It is able to communicate with the server on the default port and handles the possible errors. It shows 
the main functionality to the user. Based on this demo, the user can judge if the final product approaches their wishes or not. Due to the lack 
of specification related to the client side, creating a fancier client would be a waste of time. 

The server is able to fetch the weather info from the API. It handles the possible API-side and client side errors as well. It is configurable from 
the command line and gives an extensive help if required. The server functionality is encapsulated in a class which is ready for testing. 
It receives external communication interfaces as arguments so it is unit-testable with mocked dependencies. 

### Known Issues

- the client is not nice
- the client is not mobile-responsive
- the client doesn't scale if the user uses a smaller or higher resolution screen
- the client has no tests
- the server has no tests
