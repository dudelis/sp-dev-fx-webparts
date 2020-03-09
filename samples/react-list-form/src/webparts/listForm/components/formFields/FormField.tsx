import * as React from 'react';

import { Icon, Label } from 'office-ui-fabric-react';
import { css, DelayedRender } from 'office-ui-fabric-react/lib/Utilities';
import { AnimationClassNames, getTheme, ITheme } from '@uifabric/styling';
import * as stylesImport from 'office-ui-fabric-react/lib/components/TextField/TextField.types';

import { ControlMode } from '../../../../common/datatypes/ControlMode';
import { IFieldSchema } from '../../../../common/services/datatypes/RenderListData';


const styles: any = stylesImport;
import ardStyles from './FormField.module.scss';

export interface IFormFieldProps {
  className?: string;
  controlMode: ControlMode;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  value: any;
  errorMessage?: string;
  valueChanged(newValue: any): void;
};

const FormField: React.SFC<IFormFieldProps> = (props) => {
  let theme: ITheme = getTheme();
  const {
    children,
    className,
    description,
    disabled,
    label,
    required,
    active,
    errorMessage,
  } = props;
  const formFieldClassName = css('ard-formField', ardStyles.formField, styles.root, className, {
    ['is-required ' + styles.rootIsRequired]: required,
    ['is-disabled ' + styles.rootIsDisabled]: disabled,
    ['is-active ' + styles.rootIsActive]: active,
  });
  const isDescriptionAvailable = Boolean(props.description || props.errorMessage);

  return (
    <div className={css(formFieldClassName, 'od-ClientFormFields-field')}>
      <div className={css('ard-FormField-wrapper', styles.wrapper)}>
        {label && <Label className={css(ardStyles.label, { ['is-required']: required })}>{label}</Label>}
        <div className={css('ard-FormField-fieldGroup', ardStyles.controlContainerDisplay, active
          && styles.fieldGroupIsFocused, errorMessage && styles.invalid)}>
          {children}
        </div>
      </div>
      {isDescriptionAvailable &&
        <span>
          {description && <span className={css('ard-FormField-description', styles.description)}>{description}</span>}
          {errorMessage &&
            <div aria-live='assertive'>
              <DelayedRender>
                <p style={{ color: theme.semanticColors.errorText }} className={css('ard-FormField-errorMessage', AnimationClassNames.slideDownIn20, styles.errorMessage)}>
                  {<Icon iconName="Error" className={styles.errorMessage} />}
                  <span data-automation-id='error-message'>{errorMessage}</span>
                </p>
              </DelayedRender>
            </div>
          }
        </span>
      }
    </div>
  );
};

export default FormField;
