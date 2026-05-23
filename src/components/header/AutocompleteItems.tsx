export interface AutocompleteItemsModel {
  results: {
    id: number;
    link: string;
    title: {
      rendered: string;
    };
    _embedded: {
      "wp:featuredmedia": {
        media_details: {
          sizes: {
            thumbnail: {
              source_url: string;
              width: number;
              height: number;
            };
          };
        };
      }[];
    };
  }[];
}

const AutocompleteItems = (model: AutocompleteItemsModel) => {
  const { results } = model;

  return (
    <div className="absolute left-0 top-full z-50 w-full bg-white shadow-lg max-h-[300px] overflow-y-auto">
      {results.map((result) => (
        <a
          key={result.id}
          href={result.link}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 transition-colors"
        >
          <img
            src={
              result._embedded["wp:featuredmedia"][0]?.media_details.sizes
                .thumbnail.source_url
            }
            alt={result.title.rendered}
            className="w-10 h-10 object-cover rounded-full"
          />

          <span className="text-xs font-medium text-gray-800 line-clamp-2">
            {result.title.rendered}
          </span>
        </a>
      ))}
    </div>
  );
};

export default AutocompleteItems;
