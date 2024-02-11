import Image from "next/image";
import Layouts from "@/components/Layouts";
import data from "../../utils/data";
import bgCover from "/public/images/cover.webp";
import ProductItem from "@/components/products/ProductItem";

export default function Home() {
  if (!data || !data.product) {
    return (
      <Layouts title="Нүүр хуудас">
        <p>Loading...</p>
      </Layouts>
    );
  }
  return (
    <div>
      <Layouts title="Нүүр хуудас">
        <Image width={1920} height={1080} className="w-full" src={bgCover} />
        <h1 className=" mt-12 text-2xl text-gray-500">Бүх цэцэг</h1>
        <div className="container  mt-12 grid grid-cols gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data?.product.map((product, i) => (
            <ProductItem product={product} key={i} />
          ))}
        </div>
      </Layouts>
    </div>
  );
}
