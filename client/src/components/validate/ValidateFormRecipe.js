import React, {Fragment, useState} from 'react';

export function validate(input) {
    let errors = {};
    if (!input.image) {
        errors.image = 'URL Picture is required';
    }

    if (!input.name) {
        errors.name = 'Title is required';
    }

    if (!input.summary) {
        errors.summary = 'Title is required';
    }

    return errors;
}

//export default Validate