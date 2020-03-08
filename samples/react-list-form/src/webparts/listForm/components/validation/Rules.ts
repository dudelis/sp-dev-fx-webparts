import * as ErrorMessages from './ErrorMessages';

export const required = (text: string) => {
    if (text) {
        return null;
    } else {
        return ErrorMessages.isRequired;
    }
};