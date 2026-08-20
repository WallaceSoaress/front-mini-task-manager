import "styled-components";
import { ITheme } from "../interfaces/Theme/ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
