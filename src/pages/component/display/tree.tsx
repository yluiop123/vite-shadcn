import Tree from "@/components/ext/tree";

const MOCK = [
  { 
    id: "1", 
    name: "Assets", 
    children: [
      { id: "1a", name: "logo.png" },
      { id: "1b", name: "banner.jpg" }
    ] 
  },
  { 
    id: "2", 
    name: "Source", 
    children: [
      { id: "2a", name: "index.tsx" },
      { id: "2b", name: "app.css" }
    ] 
  }
];

export default function App() {
  return (
    <div className="p-10 bg-zinc-50 min-h-screen flex justify-center items-start">
      <Tree initialData={MOCK} />
    </div>
  );
}