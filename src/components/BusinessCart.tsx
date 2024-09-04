import Image from "next/image";
import Link from "next/link";
import BusinessContact from "./business/BusinessContact";
import businessLogo from "@/assets/images/business-image.png";
import generateStars from "./business/generateStar";
import { RiCustomerService2Line } from "react-icons/ri";

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
      <div className="space-y-6 lg:space-y-4">
        <div className="flex justify-start items-end gap-3">
          <Link
            href={"/business/" + data.id}
            className="text-2xl font-medium hover:text-green-500"
          >
            {data.name}
          </Link>
          <div className="flex justify-start gap-1.5">
            {/* <span className="pr-1">Ratings :</span>  */}
            {generateStars(5)}
            {`[${data._count?.reviews}]`}
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-3 text-white font-extralight">
          {/* <RiCustomerService2Line size={18} className="text-[#058240]"/> */}
          {data?.services.map((skill: any, index: any) => (
            <li
              key={index}
              className="p-1 px-2.5 bg-green-500 rounded-2xl text-[12px]"
            >
              {skill}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
              fill="#058240"
            />
          </svg>
          {[data?.address, data?.suburb, data?.state].map(
            (item: string | undefined, index: number) =>
              item && index !== 0 ? ", " + item : item
          )}
        </div>
        {/* <div
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data?.about }}
        /> */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <BusinessContact
            email={data?.user?.email}
            number={data.mobile}
            businessId={data.id}
          />
          {
            <Link href={`/business/${data.id}`}>
              <button className="flex items-center justify-center gap-2 w-52 h-16 bg-green-500 rounded-md text-white ">
                See more...
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default BusinessCart;
