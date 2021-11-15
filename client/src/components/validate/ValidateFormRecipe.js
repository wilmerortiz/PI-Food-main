import React, {Fragment, useState} from 'react';

export function validate(input) {
    let errors = {};
    if (!input.image) {
        errors.image = 'URL Picture is required';
    }

    if (!input.title) {
        errors.title = 'Title is required';
    }

    if (!input.summary) {
        errors.summary = 'Title is required';
    }

    return errors;
}

//export default Validate