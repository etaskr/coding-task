'use strict';

import React from 'react';

/**
 * RenderIf - helper function for handling conditional rendering in render functions
 */
const isFunction = input => typeof input === 'function';

export default predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;


/**
 * Format input to a temperature string - add the degrees celcius part
 */
export function formatTemperature (temperature) {
    if (temperature) {
        return <span>{temperature}&deg;c</span>;
    }
    return null;
}