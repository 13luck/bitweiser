import React, { useState } from 'react';
import { render, fireEvent } from 'react-testing-library';
import { bitweiser } from '../src';

describe('bitweiser 🍺', () => {

    const
        a = 1 << 0, // 0001
        b = 1 << 1, // 0010
        c = 1 << 2, // 0100
        d = 1 << 3; // 1000

    function App({ initialState }) {
        const {
            state,
            setState,
            check,
            on,
            off,
            toggle,
            invert,
        } = bitweiser(useState(initialState));
        return (
            <div>
                <div data-testid="state">{state}</div>
                <div onClick={() => on(a | c)}>turn A and C</div>
                <div onClick={() => on(b | d)}>turn B and D</div>
                <div onClick={() => off(a | c)}>off A and C</div>
                <div onClick={() => toggle(a | b)}>toggle A and B</div>
                <div onClick={() => invert()}>invert</div>
                <div onClick={() => setState(0)}>reset/next state</div>
                <div data-testid="check">A is {check(a) ? 'ON' : 'OFF'}</div>
            </div>
        );
    }

    const { getByText, getByTestId } = render(<App initialState={0}/>);
    const getState = () => parseInt(getByTestId('state').textContent, 10);
    const click = (text) => fireEvent.click(getByText(text));
    const prettyState = s => s.toString(2).padStart(32, '0');

    test('should init', () => {
        expect(getState()).toBe(0);
    });
    test('should `on`', () => {
        click('turn A and C');
        expect(getState()).toBe(a | 0 | c | 0);
        click('turn B and D');
        expect(getState()).toBe(a | b | c | d);
    });
    test('should `off`', () => {
        click('off A and C');
        expect(getState()).toBe(0 | b | 0 | d);
    });
    test('should `toggle`', () => {
        click('toggle A and B');
        expect(getState()).toBe(a | 0 | 0 | d);
    });
    test('should `invert`', () => {
        click('invert');
        expect(prettyState(getState())).toBe('11111111111111111111111111110110');
        click('invert');
        expect(prettyState(getState())).toBe('00000000000000000000000000001001');
    });
    test('should `check`', () => {
        expect(getByTestId('check').textContent).toBe('A is ON');
    });
    test('should `reset`', () => {
        click('reset/next state');
        expect(getState()).toBe(0);
    });
});
