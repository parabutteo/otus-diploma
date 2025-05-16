import * as React from "react";
import { Header } from "./Header.tsx";

interface Props {
  title: string;
  children: React.ReactNode | string;
}

export const Layout: React.FC<Props> = ({title, children}) => (
  <>
    <Header />
    <h1>{title}</h1>
    {children}
  </>
);