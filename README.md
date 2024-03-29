# <img src="./react-brands.png" alt="logo-image" /> react-hooks-cheatsheet

**with practical implementations**

## Feature Implementations
[pull-down-to-refresh-react](https://codesandbox.io/s/pull-down-to-refresh-react-0vypxo?file=/src/App.js)

## Contents
- React Hooks
  - [useState](#useState)
  - [useReducer](#useReducer)
  - [useRef](#useRef)
  - [useEffect](#useEffect)
  - [useLayoutEffect](#useLayoutEffect)
  - [useImperativeHandle](#useImperativeHandle)
  - [useContext](#useContext)
  - [useMemo](#useMemo)
  - [useCallback](#useCallback)
 
- React Custom Hooks
  - [useTimeout](#useTimeout)
  - [useDebounce](#useDebounce)
  - [useThrottle](#useThrottle)
  - [useOutsideClick](#useOutsideClick)
  - [useIntersectionObserver](#useIntersectionObserver)

- React Advanced Concepts/Patterns
  - [Portals](#Portal)
  - [High Order Components](#HOC)
  - [Lazy Loading (React Suspense)]()
  - [Pure Component](#)
  - [HOC Vs Hooks](#)
  - [Controlled Props](#)
  - [Compund Components](#)

**[Live Codesandbox link with all the examples listed above](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/App.js)**

# React Hooks

## useState

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UsestatePage.js)

- It is one of the basic hook, that provides statefull logic to functional components, enables us to save values in state, and upon updating on state, the component re-renders.

**SYNTAX:**

```js
const [state, setState] = useState(initialValue);
// here state is the value, setState is the state updater function, and
// initial value is given as argument in the useState function
```

**NOTE:**

- On change in props or state, re-rendering is trigerred.
- To preserve one state variable, one useState() instance is needed, unlike state object in class components, which holds all the state variable values.

## useReducer

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UsereducerPage.js)

- It is a larger version of useState, that also enables us to maintain state in our component.

**WHY?**

```js
const [count, setCount] = useState(0);
const [showText, setShowText] = useState(true);

const buttonHandler = () => {
  // here comes the case, as here 2 states are being updated in one function, not a thing to worry,
  // but in larger application, you might be changing 5, 10 states in one go, which reduces code redablity and,
  // also one useState() declaration per state variable, making the code lengthier and hard to read.
  // Therefore, useReducer is used to handle large number of state updations, at once, with ease.
  setCount(count + 1);
  showText(!showText);
};

<button onClick={buttonHandler}>Update Count</button>;
{
  state.showText && <p>This text appears magically! ✨</p>;
}
```

**SYNTAX:**

```js
// function which actually updates the state, based on the action wanted
const reducerFunction = (state, action) => {
  switch (action.type) {
      case "INCREMENT":
        // count = count + 1
        return { count: state.count + 1, isModalOpen: state.isModalOpen }
      case "TOGGLEMODAL":
        // toggle modal state
        return { count: state.count, isModalOpen: !state.isModalOpen }
      default:
        return state
  }
}

// initial state values
 const initialState = {
  count: 0,
  isModalOpen: true,
 }

// state is the object containing state values,
// dispatch is the function, which enables us to change a particular state
const [ state, dispatch ] = useReducer(reducerFunction, intialState)

<p>Button is pressed: {state.count} times</p>
<button>Update Count</button>
{ state.isModalOpen && <Modal>This text appears magically! ✨</Modal> }
```

**NOTE:**

- Behind the scenes, useState() is used to create useReducer()
- It also depicts is the basic principle, of how **react-redux** works.

## useRef

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UserefPage.js)

- You are used to do **document.getElementById('id')**, **document.getElementByClassName('class')** in vanilaJS, but in React, it is not encouraged, unless you really have to do so.
- useRef allows you to get DOM elements, as we did in vanillaJS.

**SYNTAX:**

```js
// generally null is used as initial value, can also leave it as it is
const inputRef = useRef(null);

const buttonHandler = () => {
  // clears the git@github.com:daxter-army/react-hooks-cheatsheet.gitinput field value
  inputRef.current.value = "";

  // focus on the input field
  inputRef.current.focus();
};

return (
  <div>
    <input ref={inputRef} />
    <button onClick={buttonHandler}>Note it!</button>
  </div>
);
```

**EXTENDED USECASE:**

```js
// It can also be used to save some value, but there a catch here
const countRef = useRef(0)

console.log('rendered first time only')

const buttonHandler = () => {
  countRef.current++
  // updating the ref value do not trigger re-rendering of the component
  console.log('value: ', countRef.current)
}

// therefore only initial value stays here, never changes, because the component never re-renders
<p>Button is pressed: {countRef.current}</p>
<button onClick={buttonHandler}>Update Count</button>
```

**NOTE:**

- As we forward props from parent to child component, we can't forward refs like this, instead, forwardRef is used to achieve the same.
- useState triggers UI re-rendering whereas useRef updation do not triggers UI re-redering.
- refs must be updated inside useEffect hook or any other event handler, not randomly anywhere.

_External Resources_<br/>
_[Dmitri Pavlutin's React ref guide](https://dmitripavlutin.com/react-useref-guide/)_

## useEffect

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UseeffectPage.js)

- If you are coming from class components, useEffect is capable of performing **componentDidMount()**, **componentDidUpdate()**, **componentWillUnmount()**.
- **IMP!** It is fired after the JSX elements has been rendered on the screen.

**SYNTAX:**

```js
useEffect(() => {
  // ...
  side_effects;
  // ...
  return () => {
    // preform cleanup here
  };
}, [dependency_array]);
```

**EXAMPLE:**

```js
const refreshWindowSize = () => {};

useEffect(() => {
  // side-effect
  window.addEventListener("resize", refreshWindowSize);

  // cleanup
  return () => window.removeEventListener("resize", refreshWindow);
}, []);
```

**USECASES:**

- without dependency array -> on runs on mounting, and on every state update
- with empty dependency array -> runs on mounting only
- with dependency item in dependecy array -> runs on mounting and everytime that dependency updates

## useLayoutEffect

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UselayouteffectPage.js)

- It is similar to useEffect though is not much used as useEffect
- One difference is **useEffect** runs **asynchronoulsy** after render, after the DOM manipulations are painted on the screen, and **useLayoutEffect** runs **synchronously**, after render, but prior to the the painting of DOM manipulations on the screen.

**SYNTAX:**

```js
useLayoutEffect(() => {
  // ...
  side-effect
  // ...

  return(() => { // do cleanup })
}, [dependency_array])
```

**NOTE:**

- It is not used too often, but sometimes can be used in case your UI is flashy when useEffect is being used.
- Generally useEffect is prefered, for all the side-effects to cause in your application

_External Resources_<br/>
_[Dave Ceddia useLayoutEffect vs useEffect](https://daveceddia.com/useeffect-vs-uselayouteffect/)_

## useImperativeHandle

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UseimperativehandlePage.js)

- It is used to call functions, or to handle the state of child component from the parent component with the help of refs

**SYNTAX:**

```
// takes 2 arguments ref and function that returns object
useImperativeHandle(ref, () => ({
  alterToggle() {
    setToggle(!toggle)
  }
}))
```

**NOTE:**

- It is useful to create components like Modals, toasts, snackbars etc, where the child component is called by an action happened in the parent component.

## useContext (Context API)

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UsecontextPage.js)

- It's React's own state management system, which eliminates the need of prop-drilling for passing state from one component to another.
- It in itself is a relatively larger topic than any other hook.

**WHY?**

```js
   Parent
     /\
    /  \
Login  User
```

- Let's say Login component is containing an input field and User component is showing the active user on the screen.
- Right now if we need to pass the **username** from Login to User, then we have to uplift state, from both the components and have to store and serve state from **Parent** component.
- Everything is good, **but**.
- But what if we need to pass the state 2, 3, or 5 components up/down depending upon our component structure, then we have to pass it from each and every component, also causing them to re-render, which is not acceptable for large scale applications.
- So useContext provides a way to share state between your components, without the traditional prop-drilling.

**SYNTAX:**

```js
// UsecontextPage.js

import react, { useState, createContext } from "react";

export const AppContext = createContext(null);

const UsecontextPage = () => {
  const [username, setUsername] = useState("daxter-army");

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      <Login />
      <User />
    </AppContext.Provider>
  );
};

export default UsecontextPage;
```

```js
// Login.js
import React, { useContext } from "react";
import { AppContext } from "../../pages/UsecontextPage";

const Login = () => {
  const { username, setUsername } = useContext(AppContext);

  return (
    <input
      type="text"
      value={username}
      onChange={(e) => {
        setUsername(e.target.value);
      }}
    />
  );
};

export default Login;
```

```js
// User.js

import React, { useContext } from "react";
import { AppContext } from "../../pages/UsecontextPage";

const User = () => {
  const { username } = useContext(AppContext);

  return <h2>User: {username}</h2>;
};

export default User;
```

**NOTE:**

- useContext is not optimised for high frequency changes, use redux, or other state management tool for that. But still is a good option, if you don't want to use any third party store management.
- It is suitable with both class components as well as functional components.

## useMemo

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UsememoPage.js)

- It is an advanced hook, is used for performance optimization. Basically it used to memoize computational intensive function calls in your react app.
- It is similar to useEffect, useLayoutEffect in a way, because, it has also got dependency array.

**SYNTAX:**

```js
const [data, setData] = useState(null);
const [toggle, setToggle] = useState(false);

// data -> It is list of users, which contains info like, user name, user's country, address and geolocation
// data is fetched over an api call and then is used in our app

const getLongestName = (users) => {
  if (!users) return null;

  // loop...

  return longestName;
};
// Now if we update toggle, you know the whole component renders,
// and this getLongestName is also trigerred, although it's input remains the same
// Therefore useMemo, only triggers function, if it is needed to

// useMemo takes 2 arguments, function and dependency array list
const longestUserName = useMemo(() => getLongestUserName(data), [data]);

return (
  <div>
    <p>Longest Name: {longestUserName}</p>
    <button>Toggle</button>
    {toggle && "Toggle"}
  </div>
);
```

**NOTE:**

- Only use when to save computational time of lengthy functions
- As the complexity of the function increases, the time for **initial render also increases**, but **subsequent renders are fast with it**.
- Do not call state updating hooks inside useMemo.

## useCallback

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/UsecallbackPage.js)

- It is also another advanced hook, which is used for optimising your react applications.
- It is used to memmoize a whole function, to efficiently prevent unnecessary renders of components.

**useCallback v/s useMemo**

- **useMemo**, caches the result of a function between renders, whereas **useCallback**, is used to memoize the function between re-renders.

**SYNTAX:**

```js
// normal function definition
const getFullName = (firstName, secondName) => firstName + secondName;

// PROBLEM: If parent re-renders, child is gonna get re-render also,
// because the function is also reinitialsed, which is updated for the child and therefore, it also re-renders,
// BUT THIS SHOULD BE AVOIDED

// with useCallback definition
const getFullName = useCallback(
  (firstName, secondName) => {
    return firstName + secondName;
  },
  [firstName, secondName]
);

// Now child will only get re-render when firstName, or secondName changes,
// otherwise no re-rendering
return (
  <div>
    <Child fullName={getFullName} />
  </div>
);
```

**NOTE:**

- It also takes 2 args, function and a dependency array.

# Custom Hooks

## useTimeout
## useDebounce
## useTimeout
## useThrottle
## useOutsideClick
## useIntersectionObserver

# Advanced React Concepts/Patterns

[Extra link](https://dev-advanced-react-patterns-ultrasimplified.netlify.app/the-medium-clap)

## Portal

- React gives an API which we can use to render our elements, outside the conventional **root** div, because sometimes you need to render things outside the root div.

[Codesandbox Playground](https://codesandbox.io/s/empty-hooks-hdjywu?file=/public/index.html)

**SYNTAX:**

```html
<!-- index.html  -->

... other code
<div id="modal-root"></div>
<div id="root"></div>
... other code

<!-- your usual react code renders inside **#root**, -->
<!-- but the code that we will be rendering with portal would be inside **#modal-root**. -->
```

```js
// Modal.js

import "./Modal.css";
import { createPortal } from "react-dom";

// It takes 2 arguments, 1st -> the code which is needed to be rendered,
// 2nd the DOM node, in which the code is needed to be rendered.

const Modal = () => {
  return createPortal(
    <div className="modal">... // modal code</div>,
    document.getElementById("modal-root")
  );
};
```

**NOTE:**

- Rest all the things, and event capturing works in the way, as it supposed to work. The `<Parent/>` can captures all the state of the `<Modal />`, whether it is implemented using portals or not.

## HOC

[Codesandbox Playground](https://codesandbox.io/s/empty-hooks-hdjywu?file=/public/index.html)

- Like all other components, it is also a component, or we can say a function (because a component, is nothing but only a function), that takes a component, and returns a new component.

- It is created when there are multiple components, with similar logic and a very little UI differences, so that we can reuse them with a single component, rather than defining a brand new component to cover all the use cases.

- It provies you functionality to reuse your code logic, but to render different UIs, like:
  _ Rendering multiple lists of users, locations, photos
  _ Infinite scroll, in different views, with different data etc

**It is basically used to share logic across different components, without having to rewrite it.**

**SYNTAX:**

- Consider a scenario, where you want to render list of users and products, and also want to give an option to search the list.

- Here the logic for searching the list is same, just the UI will be different of both the lists.

- **The Logic is same, just the UI is different, so here we can use HOC do reuse our logic for searching items from list.**

```javascript
// App.js
return (
  <div className="App">
    <Products />
    <Users />
  </div>
);
```

```javascript
// Products.js

import withSearch from "../withSearch";
import { products } from "../data";

const Products = ({ data }) => {
  return (
    <div>
      <h3>Products</h3>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default withSearch(Products, products);
```

```javascript
// Users.js

import withSearch from "../withSearch";
import { users } from "../data";

const Users = ({ data }) => {
  return (
    <div>
      <h3>Users</h3>
      {data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default withSearch(Users, users);
```

// Otherwise this logic would have been coded in both Products.js and Users.js separately

```javascript
// withSearch.js

const withSearch = (WrappedComponent, listItems) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
      };
      this.searchTermHandler = this.searchTermHandler.bind(this);
    }

    searchTermHandler(event) {
      this.setState({ searchTerm: event.target.value });
    }

    render() {
      const filteredList = listItems.filter(
        (item) =>
          item.name
            .toLowerCase()
            .indexOf(this.state.searchTerm.toLocaleLowerCase()) >= 0
      );

      return (
        <div>
          <input
            type="text"
            placeholder="search"
            value={this.searchTerm}
            onChange={this.searchTermHandler}
          />
          <WrappedComponent data={filteredList} />
        </div>
      );
    }
  }

  return HOC;
};

export default withSearch;
```

**NOTE:**

- The core of the HOC can be written as

  - **Functional Component:** But you won't be able to call hooks inside this component, since it is a nested component/function, therefore leading to a very stateless HOC, which merely serves the purpose of a wrapper.
  - **Class Component:** Class components are itself capable of doing anything, therefore you can do anything as per your needs in this class component (Although React Hooks are also banned in class components, as you know! 😛).

- Do not use call HOC in the render()

```js
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

- To pass ref, use `React.forwardRef()`

## Lazy Loading with React Suspense

[Codesandbox Playground](https://codesandbox.io/s/empty-hooks-hdjywu?file=/public/index.html)

- Let's assume you are making a platform, in which students are required to mark their attendence, and teachers can access the panel to approve/cancel the same.
- Teachers cannot access students portal and students cannot access teachers panel. So wouldn't it be great if you only load the required feature, which is to be accessed because the user of your application can only access one feature at a time? Here React Suspense comes in clutch!.
- React Lazy loading offers you code splitting, which allows you to load React components dynamically.

```javascript

const Teacher = lazy(() => import("./Teacher/Teacher"));
const Student = lazy(() => import("./Student/Student"));

const App = () => {
    const switchHandler = () => {
        setPanel(panel === "TEACHER" ? "STUDENT" : "TEACHER");
    };

    return (
        // ... other code
        <button onClick={switchHandler}>Load Panel</button>
        <Suspense fallback={<div>loading...</div>}>
            {panel === "TEACHER" && <Teacher>Teacher Panel loaded lazily</Teacher>}
            {panel === "STUDENT" && <Student>Student Panel loaded lazily</Student>}
        </Suspense>

        // ... other code
    )
}

export default App
```

## Pure Component or React.Memo

- Pure Component (React.Memo) is used to optimise your class based/functional component, to prevent unneccessary re-renders, when there is no change in the props of a component.

- **Need:** To optimize unnecessary renders in the components.

- A normal component (which is extended from Component class), renders when:
  - State changes
  - Prop changes
  - Context changes
  - Parent re-renders
- Therefore, by using Pure Component, we can prevent rendering of the component, when the parent renders, and when there is no change in props/state.

- **How:** It shallow compares the prevState with state and prevProps and props, and if there is any difference, then it triggers re-render.

```js
// Parent.js
const [name, setName] = useState("Hello");

useEffect(() => {
  const changer = setInterval(() => {
    setName("Hello");
    console.log("Changing Name!");
  }, 2000);

  return () => clearInterval(changer);
}, []);

return (
  <div>
    <RegComp name={name} />
    <PureComp name={name} />
  </div>
);
```

```js
// RegComp.js
import { Component } from "react";

class RegComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("RegComp Rendering!");
    return (
      <p>
        <b>Name: {this.props.name}</b>
      </p>
    );
  }
}

export default RegComp;
```

```js
// PureComp.js
import { PureComponent } from "react";

class PureComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("PureComp Rendering!");
    return (
      <p>
        <b>Name: {this.props.name}</b>
      </p>
    );
  }
}

export default PureComp;
```

## HOC Vs Hooks

[Live Codesandbox Link](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/HOCVsHookPage.js)

- Both HOCs and hooks are used to encourage code reusability, but both uses very different approach at it. Here a codesandbox that illustrates that how same things can be accomplished by using different react strategies.

## Compound Components Pattern

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/CompoundComponentPage.js)

- Lets consider 2 designs for trains.

  - **The First Design:** Here all the carriages are interconnected, and if person enters in any of the carriage, he/she can traverse the whole train. The train is a large lump itself.<br/><br/>
    <img src="./style2.svg" width="450px"/>

    - or if we try to rephrase it in a react analogy

    ```javascript
        <Bike {...props } />
           | -> <Body {...props} />
           | -> <Chasis {...props} />
           | -> <Engine {...props} />
        // Like we return <Bike /> to the user,
        // and user dont knows about the inner components,
        // one single entry point and one large lump
    ```

  - **The Second Design:** Here every carriage is separated in itself, and all the components are isolated and self-contained, and the carriages are connected with each other with the help of some coupling. The train is not a large lump itself.<br/><br/>
    <img src="./style1.svg" width="450px" />

    - or if we try to rephrase it in a react analogy

    ```javascript
    <Bike>
      <Body />
      <Chasis />
      <Engine />
    </Bike>
    // All the components are exposed to the user
    ```

#### But why ?

<img src="./pic3.svg" width="500px" />

- **Customizibility:** In the train, if we can know that certain type of people are here, then we can treat them specially, _(like it generally happens in trains)_ we can provide them with special functionalities. In React lingo, we can provide special props to different components, as per our need.
- **Understandable API:** With the first design, the implementation and working of the bike is hidden from user, `<Bike />` is like a magic to the user, but with the compound components design, everything is clear to the user.
- **Props Overload:**
  In this design architecture, if we want to pass props to `<Body/>`, then it has to go through `<Bike/>`, and is also available to other components regardless of their needs.

  ```javascript
      <Bike {...props } />
        |-> <Body {...props} />
        |-> <Chasis {...props} />
        |-> <Engine {...props} />
  ```

  But in this design architecture, we can pass specific props to the specific components, even with same names.

  ```javascript
  <Bike>                                        // --> Locomotive
    <Body seats={...} color={...} type={...} /> // ¯\
    <Chasis number={...} modelNo={...} />       //   > Carriages
    <Engine cc={...} oil={...} />               // _/
  </Bike>
  // Locomotive: We can say that all the logic stays here, and the children component are controlled by it, like select tag in html

  // <select>
  //   <option>One</option>
  //   <option>Two</option>
  //   <option>Three</option>
  // </select>
  ```

## The Controlled Props

[Codesandbox Playground](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/pages/ControlledPropsPage.js)

- **Uncontrolled Component:** A component is an uncontrolled component, when the component is itself handling it's state (or when the DOM is controlling the state, then it is considered an higher degree of uncontrollness.)

- **Controlled Component** A component, whose state is controlled by it's parent component (or in other case, when state is handled by React, if earlier the state was controlled by DOM.)

- It is a good practice to control Form elements via controlled props.

```js
// Parent: It is controlling Child
const Parent = () => {
  const [value, setValue] = useState("Controlled");

  const valueHandler = (inputValue) => {
    if (inputValue.match(/^[a-zA-Z]+$/)) {
      setValue(inputValue);
    }
  };

  return (
    <div>
      {/* Controlled Component*/}
      <Child textValue={value} textHandler={valueHandler} />
      {/* Uncontrolled Component*/}
      <Child />
    </div>
  );
};

// Child: It is being controlled by parent
const Child = ({ textValue, textHandler }) => {
  const [text, setText] = useState("Uncontrolled");

  const inputHandler = ({ target: { value } }) => {
    if (textHandler !== undefined) {
      textHandler(value);
    } else {
      setText(value);
    }
  };

  return (
    <input
      type="text"
      value={textValue !== undefined ? textValue : text}
      onChange={inputHandler}
    />
  );
};
```
