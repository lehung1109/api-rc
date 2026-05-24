import type { HeaderInnerModel } from "./HeaderInner";
import HeaderInner from "./HeaderInner";
import type { HeaderMenuModel } from "./HeaderMenu";
import HeaderMenu from "./HeaderMenu";
import type { HeaderTopModel } from "./HeaderTop";
import HeaderTop from "./HeaderTop";

export interface HeaderModel {
  headerTop: HeaderTopModel;
  headerInner: HeaderInnerModel;
  headerMenu: HeaderMenuModel;
}

const Header = (model: HeaderModel) => {
  const { headerTop, headerInner, headerMenu } = model;

  return (
    <div>
      <HeaderTop {...headerTop} />
      <HeaderInner {...headerInner} />
      <HeaderMenu {...headerMenu} />
    </div>
  );
};

export default Header;
