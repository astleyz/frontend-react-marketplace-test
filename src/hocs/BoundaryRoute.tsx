import { FC, Suspense } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import BoundaryError from './BoundaryError';

interface BoundaryRouteProps extends RouteProps {
  component?: FC<any>;
  render?: FC<any>;
  suspense?: boolean;
  children?: never;
}

const BoundaryRoute: FC<BoundaryRouteProps> = props => {
  const { component, render, suspense, ...rest } = props;
  const Component = component || render;
  if (!Component) throw new Error('"render" or "component" prop is necessary');

  if (suspense)
    return (
      <Suspense fallback={<div>Подождите...</div>}>
        <Route
          render={p => (
            <BoundaryError>
              <Component {...p} />
            </BoundaryError>
          )}
          {...rest}
        />
      </Suspense>
    );

  return (
    <Route
      render={p => (
        <BoundaryError>
          <Component {...p} />
        </BoundaryError>
      )}
      {...rest}
    />
  );
};

export default BoundaryRoute;
