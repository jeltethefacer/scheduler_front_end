import React from 'react';
import {Alert} from '@material-ui/lab';

export const errorCodeFormatting = (errorCode, errorText, errorInfo = "") => {
    if(!errorCode || errorCode === "") {
        return;
    }
    return <Alert severity="error">{errorText(errorCode, errorInfo)}</Alert>
}