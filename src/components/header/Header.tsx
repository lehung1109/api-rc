import type { HeaderTopModel } from "./HeaderTop";
import HeaderTop from "./HeaderTop";

export interface HeaderModel {
  headerTop: HeaderTopModel;
}

const Header = (model: HeaderModel) => {
  const { headerTop } = model;

  return (
    <div>
      <HeaderTop {...headerTop} />
    </div>
  )
}

export default Header;