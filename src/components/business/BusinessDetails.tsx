import Image from "next/image";
import BusinessContact from "./BusinessContact";
import { TBusiness } from "@/redux/features/users/authSlice";
// import businessImage from "@/assets/images/business-image.png";
import { FaFacebookF } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import LoaderWraperComp from "../LoaderWraperComp";

function BusinessDetails({
  businesDetails,
  isLoading,
  isError,
}: {
  businesDetails: TBusiness;
  isLoading: boolean;
  isError: boolean;
}) {
  // console.log(businesDetails);
  return (
    <LoaderWraperComp isLoading={isLoading} isError={isError} dataEmpty={!businesDetails}>
      <div className="space-y-5 lg:space-y-7">
        {/* <div className="">
        <Image src={businessImage} alt="image1" className="" />
      </div> */}
        <div className="space-y-4">
          <h3 className="font-medium text-xl">Description</h3>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: businesDetails?.about }}
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-medium text-xl ">My Services</h2>
          <ul className="flex flex-wrap items-center gap-3 text-white font-extralight">
            {businesDetails?.services?.map((skill: any, index: any) => (
              <li
                key={index}
                className="p-1 px-2.5 bg-green-500 rounded-2xl text-[12px]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex flex-col gap-5 text-black-400">
          <li className="flex items-center gap-3">
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
            {[
              businesDetails?.address,
              businesDetails?.suburb,
              businesDetails?.state,
            ].map((item: string | undefined, index: number) =>
              item && index !== 0 ? ", " + item : item
            )}
          </li>
          <li className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z"
                fill="#058240"
              />
            </svg>
            <a
              href={"tel:+61" + businesDetails?.phone}
              target="_blank"
              className="line-clamp-1"
            >
              {businesDetails?.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00333 5.88355L9.99995 9.88186L17.9967 5.8835C17.9363 4.83315 17.0655 4 16 4H4C2.93452 4 2.06363 4.83318 2.00333 5.88355Z"
                fill="#058240"
              />
              <path
                d="M18 8.1179L9.99995 12.1179L2 8.11796V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V8.1179Z"
                fill="#058240"
              />
            </svg>
            <a
              href={"mailto: " + businesDetails?.user?.email}
              target="_blank"
              className=""
            >
              {businesDetails?.user?.email}
            </a>
          </li>
          {businesDetails?.website && (
            <li className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5553 5.41219C15.6787 4.16136 14.4635 3.18655 13.0523 2.60219C13.8432 3.99384 14.4048 5.50387 14.7153 7.07419C15.4061 6.61257 16.026 6.05268 16.5553 5.41219ZM13.3263 7.82519C12.9877 5.73772 12.1609 3.7597 10.9133 2.05219C10.3065 1.98325 9.69398 1.98325 9.08726 2.05219C7.83962 3.7597 7.01285 5.73772 6.67426 7.82519C7.72606 8.2722 8.85742 8.5018 10.0003 8.50019C11.1803 8.50019 12.3043 8.26019 13.3263 7.82519ZM6.51426 9.37619C7.62977 9.79035 8.81036 10.0017 10.0003 10.0002C11.2263 10.0002 12.4003 9.78019 13.4863 9.37619C13.5454 10.6394 13.4272 11.9047 13.1353 13.1352C12.1081 13.3787 11.0559 13.5012 10.0003 13.5002C8.92126 13.5002 7.87226 13.3732 6.86626 13.1342C6.57402 11.9041 6.45554 10.6391 6.51426 9.37619ZM5.28526 7.07419C5.59588 5.50422 6.15741 3.99454 6.94826 2.60319C5.53706 3.18755 4.32184 4.16236 3.44526 5.41319C3.97426 6.05119 4.59426 6.61319 5.28526 7.07419ZM17.3343 6.79819C17.8995 8.09134 18.1114 9.51136 17.9483 10.9132C16.971 11.6267 15.902 12.2052 14.7703 12.6332C15.0003 11.3334 15.0588 10.0092 14.9443 8.69419C15.8328 8.18758 16.6388 7.54821 17.3343 6.79819ZM2.66626 6.79819C3.36172 7.54822 4.16769 8.1876 5.05626 8.69419C4.94287 10.0095 5.00136 11.334 5.23026 12.6342C4.0985 12.2062 3.02955 11.6276 2.05226 10.9142C1.88944 9.51227 2.10167 8.09225 2.66726 6.79919L2.66626 6.79819ZM10.0003 15.0002C10.8983 15.0002 11.7783 14.9212 12.6333 14.7702C12.2052 15.902 11.6267 16.9709 10.9133 17.9482C10.3065 18.017 9.69398 18.017 9.08726 17.9482C8.37379 16.9709 7.79526 15.902 7.36726 14.7702C8.22226 14.9212 9.10226 15.0002 10.0003 15.0002ZM14.3573 14.3572C14.0364 15.4158 13.5987 16.4354 13.0523 17.3972C14.0264 16.9938 14.9115 16.4024 15.657 15.6569C16.4025 14.9114 16.9939 14.0263 17.3973 13.0522C16.4443 13.5942 15.4263 14.0332 14.3573 14.3572ZM6.94826 17.3972C5.97416 16.9938 5.08906 16.4024 4.34354 15.6569C3.59801 14.9114 3.00666 14.0263 2.60326 13.0522C3.55626 13.5942 4.57426 14.0332 5.64326 14.3572C5.96416 15.4158 6.40186 16.4354 6.94826 17.3972Z"
                  fill="#058240"
                />
              </svg>
              <a
                href={businesDetails.website}
                target="_blank"
                className="line-clamp-1"
              >
                {businesDetails?.website}
              </a>
            </li>
          )}
          {businesDetails?.facebook && (
            <li className="flex items-center gap-3">
              <FaFacebookF size={20} className="text-[#058240]" />
              <a
                href={businesDetails.facebook}
                target="_blank"
                className="line-clamp-1"
              >
                {businesDetails?.facebook}
              </a>
            </li>
          )}
          {businesDetails?.instagram && (
            <li className="flex items-center gap-3">
              <GrInstagram size={19} className="text-[#058240]" />
              <a
                href={businesDetails.instagram}
                target="_blank"
                className="line-clamp-1"
              >
                {businesDetails?.instagram}
              </a>
            </li>
          )}
          <li className="flex items-center gap-3">
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1.875C5.5125 1.875 1.875 5.5125 1.875 10C1.875 14.4875 5.5125 18.125 10 18.125C14.4875 18.125 18.125 14.4875 18.125 10C18.125 5.5125 14.4875 1.875 10 1.875ZM10.625 5C10.625 4.83424 10.5592 4.67527 10.4419 4.55806C10.3247 4.44085 10.1658 4.375 10 4.375C9.83424 4.375 9.67527 4.44085 9.55806 4.55806C9.44085 4.67527 9.375 4.83424 9.375 5V10C9.375 10.345 9.655 10.625 10 10.625H13.75C13.9158 10.625 14.0747 10.5592 14.1919 10.4419C14.3092 10.3247 14.375 10.1658 14.375 10C14.375 9.83424 14.3092 9.67527 14.1919 9.55806C14.0747 9.44085 13.9158 9.375 13.75 9.375H10.625V5Z"
                fill="#058240"
              />
            </svg>
            <span>{businesDetails?.openHour} Hour Services</span>
          </li>
        </ul>
        <BusinessContact
          email={businesDetails?.user?.email}
          number={businesDetails?.phone}
          businessId={businesDetails?.id}
        />
      </div>
    </LoaderWraperComp>
  );
}

export default BusinessDetails;
