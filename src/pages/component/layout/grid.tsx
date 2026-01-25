export default function GridPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold">BaseGrid 基础栅格 12 + 12</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <div className="bg-sky-200 p-4 rounded">col-12</div>
        </div>
        <div className="w-1/2 px-2">
          <div className="bg-rose-200 p-4 rounded">col-12</div>
        </div>
      </div>
      <h2 className="mt-10 text-2xl font-semibold">BaseGrid 基础栅格 8 + 8 + 8</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/3 px-2">
          <div className="bg-green-200 p-4 rounded">col-8</div>
        </div>
        <div className="w-1/3 px-2">
          <div className="bg-yellow-200 p-4 rounded">col-8</div>
        </div>
        <div className="w-1/3 px-2">
          <div className="bg-purple-200 p-4 rounded">col-8</div>
        </div>
      </div>
      <h2 className="mt-10 text-2xl font-semibold">Responsive 响应式栅格</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <div className="bg-sky-200 p-4 rounded">
            col-24 → md:col-12 → lg:col-8
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <div className="bg-rose-200 p-4 rounded">Responsive Col</div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <div className="bg-green-200 p-4 rounded">Responsive Col</div>
        </div>
      </div>
    </>
  );
}