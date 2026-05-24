import type { HeaderInnerModel } from "./HeaderInner";
import HeaderInner from "./HeaderInner";
import type { HeaderTopModel } from "./HeaderTop";
import HeaderTop from "./HeaderTop";

export interface HeaderModel {
  headerTop: HeaderTopModel;
  headerInner: HeaderInnerModel;
}

const Header = (model: HeaderModel) => {
  const { headerTop, headerInner } = model;

  return (
    <div>
      <HeaderTop {...headerTop} />
      <HeaderInner {...headerInner} />
    </div>
  );
};

export default Header;
