import Image from "next/image";
import Link from "next/link";
import BusinessContact from "./business/BusinessContact";

function BusinessCart({ data }: { data: { [key: string]: any } }) {
  console.log(data)
  return (
    <div className="p-6 flex flex-col lg:flex-row items-center lg:items-start  gap-4 rounded-xl border-2 border-green-500 hover:bg-green-50 transition-all">
      <Link href={"/business/" + data.id}>
        {/* <Image
          src={image}
          alt={name}
          className="rounded-lg w-[150px] h-[150px] content-evenly"
          width={150}
          height={150}
          priority
        /> */}
        dfdsklfjsd
      </Link>
      <div>
        <Link
          href={"/business/" + data.id}
          className="text-2xl font-medium hover:text-green-500"
        >
          {data.name}
        </Link>
        {/* <p className="my-4">
          {description.length > 360
            ? description.slice(0, 360).concat("...")
            : description}
        </p> */}
        <BusinessContact email={data?.user?.email} number={data.mobile} />
      </div>
    </div>
  );
}

export default BusinessCart;
