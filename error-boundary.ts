import type { ErrorInfo } from 'react';
import type React from 'react';
import { Component } from 'react';
import Router from 'next/router';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // * MEMO: 차후 centry 적용할 것
    // console.error('Uncaught Error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      void Router.push('/404');
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
