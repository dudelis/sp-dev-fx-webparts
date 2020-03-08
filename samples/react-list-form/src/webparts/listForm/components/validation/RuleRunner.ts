import { IListFormState } from "../IListFormState";
import SPAttachmentFormFieldEdit from "../formFields/SPAttachmentFormFieldEdit";

export const ruleRunner = (field, name, ...validations) => {
    return (state: IListFormState) => {
        for (let v of validations) {
            let errorMessageFunc = v(state.data[field], state);
            if (errorMessageFunc) {
                return { [field]: errorMessageFunc(name) };
            }
        }
        return null;
    };
};

export const run = (state: IListFormState, runners) => {
    return runners.reduce((memo, runner) => {
        return (<any>Object).assign(memo, runner(state));
    }, {});
};