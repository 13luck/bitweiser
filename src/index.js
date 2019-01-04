// @flow

export const check = (state: number, s: number) => state & s;
export const on = (state: number, s: number) => state | s;
export const off = (state: number, s: number) => state & ~s;
export const toggle = (state: number, s: number) => state ^ s;
export const invert = (state: number) => ~state >>> 0;

export const bitweiser = ([state, setState]: [number, (number) => number]) => ({
  state,
  setState,
  check: (s: number) => check(state, s),
  on: (s: number) => setState(on(state, s)),
  off: (s: number) => setState(off(state, s)),
  toggle: (s: number) => setState(toggle(state, s)),
  invert: () => setState(invert(state))
});
