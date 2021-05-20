import { AxiosError } from 'axios';
import { Component, ReactNode } from 'react';
import NotFound from '../components/NotFound/NotFound';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  e: AxiosError | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    e: null,
  };

  static getDerivedStateFromError(e: AxiosError): State {
    return { hasError: true, e };
  }

  render() {
    if (this.state.hasError) {
      return (
        <NotFound
          code={this.state.e?.response?.status || 404}
          text={this.state.e?.response?.statusText || 'Not Found'}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
