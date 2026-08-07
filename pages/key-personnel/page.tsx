import KeyPersonnel from "../../src/components/key-personnel/KeyPersonnel";
import keyPersonnel from "../../src/data/key-personnel";

export const pageMeta = {
  title: "key-personnel",
};

export default function KeyPersonnelPage() {
  return <KeyPersonnel {...keyPersonnel} />;
}
