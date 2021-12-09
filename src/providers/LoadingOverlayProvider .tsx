import React, { createContext, useState, VFC } from "react";

export type LoadingOverlayContextType = {
  displayLoadingOverlay: boolean;
  setDisplayLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingOverlayContext = createContext<LoadingOverlayContextType>({} as LoadingOverlayContextType);

type Props = {
  children: React.ReactNode;
}

export const LoadingOverlayProvider: VFC<Props> = (props) => {
  const { children } = props;

  const [ displayLoadingOverlay, setDisplayLoadingOverlay ] = useState<boolean>(false);

  return (
    <LoadingOverlayContext.Provider value={{ displayLoadingOverlay, setDisplayLoadingOverlay }}>
      {children}
    </LoadingOverlayContext.Provider>
  )
}
