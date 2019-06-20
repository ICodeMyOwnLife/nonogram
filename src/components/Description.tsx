import React, { FC, memo } from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import classes from './Description.module.scss';

const Description: FC<DescriptionProps> = ({
  className,
  buttonLabel,
  description,
  onOk,
  isShown,
}) => {
  return (
    <div
      className={classnames(classes.Description, className, {
        [classes.show]: isShown,
      })}
    >
      <div className={classes.Content}>
        <h2 className={classes.Title}>{description}</h2>
        {buttonLabel && (
          <Button className={classes.NextButton} onClick={onOk}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export interface DescriptionProps {
  className?: string;
  description: string;
  buttonLabel?: string;
  onOk: VoidFunction;
  isShown: boolean;
}

export default memo(Description);
