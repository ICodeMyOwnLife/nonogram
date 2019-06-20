import React, { Component, ErrorInfo } from 'react';
import classes from './ErrorBoundary.module.scss';

export default class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  readonly state: Readonly<ErrorBoundaryState> = {
    error: undefined,
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const errorText =
        process.env.NODE_ENV === 'development'
          ? (error && error.toString()) || 'Unknown Error'
          : 'Something went wrong';
      return <h2 className={classes.ErrorBoundary}>{errorText}</h2>;
    } else {
      return this.props.children;
    }
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.log(`error:`, error, `errorInfo`, errorInfo);
  }

  static getDerivedStateFromError(error: any) {
    return { error, hasError: true };
  }
}

interface ErrorBoundaryState {
  error: any;
  hasError: boolean;
}
