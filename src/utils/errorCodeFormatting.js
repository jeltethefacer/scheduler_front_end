import React from 'react';
import {Alert} from '@material-ui/lab';

export const errorCodeFormatting = (errorCode, errorText) => {
    if(!errorCode || errorCode === "") {
        return;
    }
    return <Alert severity="error">{errorText(errorCode)}</Alert>
}