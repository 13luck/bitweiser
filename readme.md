# Bitweiser

A custom [React Hooks](https://reactjs.org/docs/hooks-overview.html) library that gives you pretty state handling.
Store your `boolean` states in `number`. Based on javascript [bitwise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators).

## Basic
```
on
0 -> 1
1 -> 1

off
0 -> 0
1 -> 0

check
0 -> 0
1 -> 1

toggle
0 -> 1
1 -> 0

invert
1001 -> 0110
```

## Usage

```js
import React, { useState } from 'react';
import { bitweiser } from 'bitweiser';

function Example() {
    
    // predefine some states
    const
        burger = 1 << 0, // 00000000 00000000 00000000 00000001
        search = 1 << 1; // 00000000 00000000 00000000 00000010
        
    const initialState = 0;
    // or const initialState = (burger | search);
    
    // state handling api
    const {
        state,
        setState,
        check,
        on,
        off,
        toggle,
        invert,
    } = bitweiser(useState(initialState));
    
    const myMapping = {
        [burger | search]: 'menu and search are opened',
        [burger]: 'only menu is opened',
        [search]: 'only search is opened',
    };
    
    return (
        <div>
            <div onClick={() => toggle(burger)}>toggle menu</div>
            <div onClick={() => off(burger)}>close menu</div>
            <div onClick={() => on(burger)}>open menu</div>
            <div onClick={() => on(burger | search)}>open all</div>
            <div onClick={() => off(burger)}>close menu</div>
            <div onClick={() => invert()}>invert state</div>
            <div onClick={() => setState(0)}>close all</div>
            <div onClick={() => setState(burger)}>close all and opened menu is the next state</div>
            
            <div>menu is {check(burger) ? 'opened' : 'closed'}</div>
            <div>menu or search is {check(burger | search) ? 'opened' : 'closed'}</div>
            <div>menu or search is {check(burger) || check(search) ? 'opened' : 'closed'}</div>
            <div>menu and search are {check(burger) && check(search) ? 'opened' : 'closed'}</div>
            
            <div>mapping example: {myMapping[state]}</div>
        </div>
    );
}
```

## License

MIT © [Alexey Ozerov](https://github.com/13luck)
