# Broken App Issues
1. No real error handling
    * in catch no error argument
2. Not handling unmatched routes
3. Not printing to console that server is running on the specified port [not mistake just bad practice]
4. app.use(express.json()) should be added 
5. Call back function is not async
6. map does not handle asynchronous code well, so I have refactored to use for let of instead