import App from "../../src/components/App";

export const pageMeta = {
  title: "home",
};

export const pageVariants = [
  {
    id: "default",
    title: "Default",
  },
  {
    id: "apartment",
    title: "Apartment variant",
  },
];

export default function HomePage({ variant = "default" }: { variant?: string }) {
  if (variant === "apartment") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-normal text-slate-950">
          Home apartment variant
        </h1>
      </main>
    );
  }

  return <App />;
}
