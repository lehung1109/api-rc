export interface AutocompleteItemsModel {
  results: any[];
}

const AutocompleteItems = (model: AutocompleteItemsModel) => {
  const { results } = model;

  return (
    <div className="absolute z-50 w-full bg-white rounded-b-lg shadow-lg">
      {results.map((result) => (
        <div key={result.id} className="p-2 hover:bg-gray-100">
          {result.title.rendered}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteItems;
