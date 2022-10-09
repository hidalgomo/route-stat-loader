# Route Service Visualizer

## Development

### Patterns (JavaScript)

The Observer pattern is used when implementing events that take action on other parts of the application, the DOM. This pattern follows the SOLID principles by keeping code flexible and extendable.

Each element is in its own class/object that initializes the event for that element. The class also makes available properties to hold functions that can be executed within the event's callback.

```javascript
// before
element.addEventListener('event', () => {
    elementX.style.width = 100;
    elementY.style.height = 300;
}, false);

// after
element.addEventListener('event', () => {
    initializedExecutables.map(exec =>  exec());
}, false);
```

