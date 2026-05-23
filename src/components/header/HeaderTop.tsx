interface HeaderTopModel {
  text: string;
  phone: string;
  search: string;
}

const HeaderTop = (model: HeaderTopModel) => {
  return (
    <div>
      <h1>HeaderTop</h1>
    </div>
  )
}

export default HeaderTop;