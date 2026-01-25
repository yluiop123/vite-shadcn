export default function FlexPage() {
    return (
        <>
            <h2 className="text-2xl font-semibold">Flex Row 横向布局</h2>
            👉 flex-1 表示自动平分空间，相当于 span=12。
            <div className="flex gap-4">
                <div className="flex-1 bg-sky-200 p-4 rounded">col-12</div>
                <div className="flex-1 bg-rose-200 p-4 rounded">col-12</div>
            </div>
            <h2 className="mt-10 text-2xl font-semibold">FlexBasis 固定比例布局</h2>
            👉 basis-1/3 ≈ 33% 宽度，对应 span=8；basis-2/3 ≈ 66%，对应 span=16。
            <div className="flex gap-4">
                <div className="basis-1/3 bg-green-200 p-4 rounded">col-8</div>
                <div className="basis-2/3 bg-yellow-200 p-4 rounded">col-16</div>
            </div>
            <h2 className="mt-10 text-2xl font-semibold">FlexOffset 偏移（offset 模拟）</h2>
            👉 ml-auto = 自动推到右边，用来模拟 offset。
            <div className="flex gap-4">
                <div className="basis-1/3 bg-purple-200 p-4 rounded">col-8</div>
                <div className="basis-1/3 ml-auto bg-pink-200 p-4 rounded">col-8 offset-8</div>
            </div>
            <h2 className="mt-10 text-2xl font-semibold">FlexCenter 居中布局</h2>
           👉
            justify-start / center / end / between / around / evenly → 水平对齐
            items-start / center / end / stretch → 垂直对齐
            <div className="flex justify-center items-center h-32 bg-gray-100">
                <div className="w-1/4 bg-sky-200 p-4 rounded">居中</div>
            </div>
        </>
    );
}