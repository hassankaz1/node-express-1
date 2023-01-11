### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

1. Using callback functions we can manage code that we want to happen after an asynchronous function or code by placing the remianing code in the call back fucntion. In this method, the following code won't execute till the async function resolves. 

2. We can also use async and await

3. We can also use promises

- What is a Promise?

Promises defer asynchronous code, it represents an operation that hasn't completed yet.

- What are the differences between an async function and a regular function?

Regular functions happen in a sequential matter, meaning they will run and exeecute in order with the rest of the code in order.
Async functions refer to functions that will return a promise. It may not run in order of code, for this reason we wrap a function with Async keyword that states that the function returns a promise, and inside the function we can use await to make sure that we will wait for that command to finish before we proceed.

- What is the difference between Node.js and Express.js?

Node.js is server side environment run in Javascript.
Express is a mini framework thats sits on top of Node.js that simplifies the server side process. 

- What is the error-first callback pattern?

Error-first call back pattern has the following template -> function something(error, success)
So here the first argument is reserved for errors, so if any error occurs in the function the first argument will be returned else the second argument will. 

- What is middleware?
It's code that run in the middle of the request/response cycle.

- What does the `next` function do?

next funciton indicates what middleware process will follow after the current function finishes.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}

Doesn't seems to have any issues but we can see that the three asynchronous calls are not dependent on each other, so we do not need to await each call as this slows down our process. If const matt executes first, we should not delay it by awaiting elie and joel. 
```
