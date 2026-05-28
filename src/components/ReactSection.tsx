interface Model {
  type: string;
  data: unknown;
  targetId?: string;
}

const ReactSection = ({ type, data, targetId }: Model) => {
  const innerHtml = { __html: JSON.stringify(data, null, "") };

  return (
    <script
      data-rct={type}
      data-rc-target={targetId}
      type="application/json"
      dangerouslySetInnerHTML={innerHtml}
    ></script>
  );
};

export default ReactSection;
