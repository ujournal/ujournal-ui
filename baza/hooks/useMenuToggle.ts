import {
  createContext,
  FC,
  ReactNode,
  createElement,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";

export const MenuToggleContext = createContext<{
  opened: boolean;
  toggle: (opened?: boolean) => void;
}>({ opened: false, toggle: () => {} });

export const MenuToggleProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggle = useCallback((opened?: boolean) => {
    if (opened !== undefined) {
      setOpened(opened);
    } else {
      setOpened((opened) => !opened);
    }
  }, []);

  const providerProps = useMemo(
    () => ({ value: { opened, toggle } }),
    [opened, toggle]
  );

  return createElement(MenuToggleContext.Provider, providerProps, children);
};

export const useMenuToggle = () => {
  return useContext(MenuToggleContext);
};
