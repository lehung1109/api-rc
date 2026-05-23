interface HeaderModel {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
}

const Header = (model: HeaderModel) => {
  return (
    <div>
      <h1>Header</h1>
    </div>
  )
}

export default Header;