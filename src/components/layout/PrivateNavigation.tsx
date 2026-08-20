import { NavLink } from "react-router";
import { Navigation } from "./styles";

export function PrivateNavigation() {
  return (
    <Navigation aria-label="Navegacao privada">
      <NavLink to="/">Tarefas</NavLink>
      <NavLink to="/teams">Times</NavLink>
    </Navigation>
  );
}
