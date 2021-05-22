import { AxiosError } from 'axios';
import { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

type Props = {
  children: ReactNode;
} & RouteComponentProps;

type State = {
  hasError: boolean;
  e: AxiosError | null;
}

class BoundaryError extends Component<Props, State> {
  state: State = {
    hasError: false,
    e: null,
  };

  static getDerivedStateFromError(e: AxiosError): State {
    return { hasError: true, e };
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.state.hasError && prevProps.match.url !== this.props.match.url) {
      this.setState({ hasError: false, e: null });
    }
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

export default BoundaryError;
