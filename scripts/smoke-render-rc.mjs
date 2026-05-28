const res = await fetch("http://localhost:3000/api/render-rc", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    component: "ProjectShowcase",
    props: {
      className: "",
      filterEndpoint: "/api/projects/filter",
      taxonomies: [
        { key: "area", label: "Area" },
        { key: "beds", label: "Beds" },
        { key: "style", label: "Style" },
      ],
      filters: {},
      filterOptions: { area: [], beds: [], style: [] },
      projects: [],
    },
  }),
});

const json = await res.json();
const html = json?.html ?? "";

console.log("status", res.status);
console.log("hasHtml", Boolean(html));
console.log("hasIslandMarker", html.includes("rc-island:"));
console.log("dataRctCount", (html.match(/data-rct=/g) ?? []).length);
console.log("dataRcidCount", (html.match(/data-rcid=/g) ?? []).length);
