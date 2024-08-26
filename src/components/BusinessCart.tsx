import Image from "next/image";
import Link from "next/link";
import BusinessContact from "./business/BusinessContact";
import businessLogo from "@/assets/images/business-image.png";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

function BusinessCart({ data }: { data: { [key: string]: any } }) {
  return (
    <div className="p-6 flex flex-col lg:flex-row items-center lg:items-start  gap-4 rounded-xl border-2 border-green-500 hover:bg-green-50 transition-all">
      <Link href={"/business/" + data.id}>
        <div className="w-[150px] h-[150px]">
          <Image
            src={data.user?.image ? apiUrl + data?.user?.image : businessLogo}
            alt={data.name}
            className="rounded-full w-full h-full content-evenly"
            width={150}
            height={150}
            priority
          />
        </div>
      </Link>
      <div>
        <Link
          href={"/business/" + data.id}
          className="text-2xl font-medium hover:text-green-500"
        >
          {data.name}
        </Link>
        <div
          className="my-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data?.about }}
        />
        <BusinessContact
          email={data?.user?.email}
          number={data.mobile}
          businessId={data.id}
        />
      </div>
    </div>
  );
}

export default BusinessCart;
