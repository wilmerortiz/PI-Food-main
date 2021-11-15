import React from 'react';

export function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'Name is required';
    }

    if (!input.description) {
        errors.description = 'Description is required';
    }

    return errors;
}