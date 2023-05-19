import React, { ReactNode, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface BlockBackButtonRouterProps {
  children: ReactNode;
}

const BlockBackButtonRouter: React.FC<BlockBackButtonRouterProps> = ({
  children,
}) => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((newLocation, action) => {
      if (action === "POP") {
        history.push(newLocation.pathname);
      }
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return <>{children}</>;
};

export default BlockBackButtonRouter;
