interface HeaderTopModel {
  text: string;
  phone: string;
  search: string;
}

const HeaderTop = (model: HeaderTopModel) => {
  const { text, phone, search } = model;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">{text}</h1>
        <h2 className="text-xl font-bold">{phone}</h2>
        <h3 className="text-lg font-bold">{search}</h3>
      </div>
    </div>
  )
}

export default HeaderTop;