# <img src="./react-brands.png" alt="logo-image" /> react-hooks-cheatsheet
[Live Codesandbox with react-hook examples](https://codesandbox.io/s/react-hooks-practice-xqyvz?file=/src/App.js)

## useState
* It is one of the basic hook, that provides statefull logic to functional components, enables us to save values in state, and upon updating on state, the component re-renders.

**SYNTAX:**
```js
const [ state, setState ] = useState(initialValue)
// here state is the value, setState is the state updater function, and
// initial value is given as argument in the useState function
```

**NOTE:**
* On change in props or state, re-rendering is trigerred.
* To preserve one state variable, one useState() instance is needed, unlike state object in class components, which holds all the state variable values.

## useReducer
* It is a larger version of useState, that also enables us to maintain state in our component.

**WHY?**
```js
const [ count, setCount ] = useState(0)
const [ showText, setShowText ] = useState(true)

const buttonHandler = () => {
  // here comes the case, as here 2 states are being updated in one function, not a thing to worry,
  // but in larger application, you might be changing 5, 10 states in one go, which reduces code redablity and,
  // also one useState() declaration per state variable, making the code lengthier and hard to read.
  // Therefore, useReducer is used to handle large number of state updations, at once, with ease.
  setCount(count + 1)
  showText(!showText)
}

<button onClick={buttonHandler}>Update Count</button>
{ state.showText && <p>This text appears magically! ✨</p> }
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
* Behind the scenes, useState() is used to create useReducer()
* It also depicts is the basic principle, of how **react-redux** works.

## useRef
* You are used to do **document.getElementById('id')**, **document.getElementByClassName('class')** in vanilaJS, but in React, it is not encouraged, unless you really have to do so.
* useRef allows you to get DOM elements, as we did in vanillaJS.

**SYNTAX:**
```js
// generally null is used as initial value, can also leave it as it is
const inputRef = useRef(null)

const buttonHandler = () => {
  // clears the input field value
  inputRef.current.value=""
  
  // focus on the input field
  inputRef.current.focus()
}

return(
  <div>
    <input ref={inputRef} />
    <button onClick={buttonHandler}>Note it!</button>
  </div>
)
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
* As we forward props from parent to child component, we can't forward refs like this, instead, forwardRef is used to achieve the same.
* useState triggers UI re-rendering whereas useRef updation do not triggers UI re-redering.
* refs must be updated inside useEffect hook or any other event handler, not randomly anywhere.

*External Resources*<br/>
*[Dmitri Pavlutin's React ref guide](https://dmitripavlutin.com/react-useref-guide/)*

## useEffect
* If you are coming from class components, useEffect is capable of performing **componentDidMount()**, **componentDidUpdate()**, **componentWillUnmount()**.
* **IMP!** It is fired after the JSX elements has been rendered on the screen.

**SYNTAX:**
```js
  useEffect(() => {
    // ...
    side_effects
    // ...
    return(() => {
      // preform cleanup here
    })
  
  }, [dependency_array])
```

**EXAMPLE:**
```js
  const refreshWindowSize = () => {
  }

  useEffect(() => {
    // side-effect
    window.addEventListener('resize', refreshWindowSize)
    
    // cleanup
    return(() => window.removeEventListener('resize', refreshWindow))
  }, [])
```

**USECASES:**
* without dependency array -> on runs on mounting, and on every state update
* with empty dependency array -> runs on mounting only
* with dependency item in dependecy array -> runs on mounting and everytime that dependency updates

## useLayoutEffect
* It is similar to useEffect though is not much used as useEffect
* One difference is **useEffect** runs **asynchronoulsy** after render, after the DOM manipulations are painted on the screen, and **useLayoutEffect** runs **synchronously**, after render, but prior to the the painting of DOM manipulations on the screen.

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
* It is not used too often, but sometimes can be used in case your UI is flashy when useEffect is being used.
* Generally useEffect is prefered, for all the side-effects to cause in your application

*External Resources*<br/>
*[Dave Ceddia useLayoutEffect vs useEffect](https://daveceddia.com/useeffect-vs-uselayouteffect/)*

## useImperativeHandle
* It is used to call functions, or to handle the state of child component from the parent component with the help of refs

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
* It is useful to create components like Modals, toasts, snackbars etc, where the child component is called by an action happened in the parent component.

## useContext (Context API)
* It's React's own state management system, which eliminates the need of prop-drilling for passing state from one component to another.

## useMemo
* It is an advanced hook, is used for performance optimisation, decrease latency on computations being done in your app
* 

## useCallback








