interface Model {
  type: string;
  data: unknown;
}

const ReactSection = ({ type, data }: Model) => {
  const innerHtml = { __html: JSON.stringify(data, null, "") };

  return (
    <script
      data-rct={type}
      type="application/json"
      dangerouslySetInnerHTML={innerHtml}
    ></script>
  );
};

export default ReactSection;
