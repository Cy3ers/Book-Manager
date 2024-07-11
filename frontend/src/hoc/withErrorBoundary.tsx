// ./hoc/withErrorBoundary.tsx

import React, { ComponentType, useState } from "react";

interface ErrorProps {
  error?: string;
  setError?: (error: string) => void;
}

const withErrorBoundary = (WrappedComponent: ComponentType<any>) => {
  return (props: Omit<ErrorProps, "setError">) => {
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [invalidError, setInvalidError] = useState<string | null>(null);

    const setError = (error: string) => {
      if (error.toLowerCase().includes("username")) {
        setUsernameError(error);
        setPasswordError(null);
        setInvalidError(null);
      } else if (error.toLowerCase().includes("password")) {
        setPasswordError(error);
        setUsernameError(null);
        setInvalidError(null);
      } else {
        setUsernameError(null);
        setPasswordError(null);
        setInvalidError(error);
      }
    };

    return (
      <div>
        <WrappedComponent
          {...props}
          setError={setError}
          usernameError={usernameError}
          passwordError={passwordError}
          invalidError={invalidError}
        />
      </div>
    );
  };
};
export default withErrorBoundary;
