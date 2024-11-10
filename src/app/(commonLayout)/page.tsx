import React from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Image from "next/image";
import generateStars from "@/components/business/generateStar";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default async function page() {
  const response = await fetch(`${apiUrl}businesses/bests`, {
    next: {
      revalidate: 86400, // revalidate in a day (86400 seconds)
    },
  });
  const result = (await response.json()) as { data: any[] };

  return (
    <>
      <Header />
      <section className="lg:px-[150px] lg:py-[72px] px-2 py-4 flex justify-center gap-16 bg-yellow-100">
        <div>
          <h3 className="text-5xl font-semibold">
            Benefits for our service providers
          </h3>
          <ul className="my-5 text-xl font-medium flex flex-col gap-3 list-disc list-inside ml-10">
            <li>full rs</li>
            <li>Online referral system</li>
            <li>Spacial promotions</li>
            <li>Create work relationships from</li>
            <li>Discount Benefits</li>
            <li>Full markting tools with </li>
          </ul>
        </div>
        <Image src="/man.png" alt="logo" width={250} height={1000} />
      </section>
      <section className="lg:px-[150px] lg:py-[72px] px-2 py-4 flex justify-center gap-16">
        <Image src="/boy.png" alt="logo" width={250} height={1000} />
        <div>
          <h3 className="text-5xl font-semibold">Benefits for our customers</h3>
          <ul className="my-5 text-xl font-medium flex flex-col gap-3 list-disc list-inside ml-10">
            <li>Direct call to service providers</li>
            <li>Discount option available from service providers</li>
            <li>Price wining option available on feedback</li>
            <li>Ask bids of your service providers from your suburb</li>
          </ul>
        </div>
      </section>
      <section className="lg:px-[150px] lg:py-[72px] px-2 py-4 pb-[156px] bg-yellow-100 flex flex-col items-center">
        <h2 className="uppercase font-semibold text-5xl">
          Service Provider of the Month
        </h2>
        <p className="font-Montserrat pt-4">
          Top 10 service providers of the month
        </p>
        <div className="mt-12 grid grid-cols-3 gap-5">
          {result.data.map((business: any, index) => (
            <div
              key={index}
              className="flex border p-5 gap-3 rounded-xl bg-white relative"
            >
              <div className="w-1/5 flex flex-col items-center justify-center gap-2">
                <Image
                  src="/busnessLogo.png"
                  alt="placeholder"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <div className="flex justify-start">
                  {generateStars(5)}
                  {`[${business._count?.reviews}]`}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-4/5">
                <Link href={"/business/" + business.id}>
                  <h3 className="text-2xl font-semibold hover:text-green-400 transition-all">
                    {business.name}
                  </h3>
                </Link>
                <p className="text-gray-700">{business.address}</p>
                <p className="text-gray-600">{business.user.email}</p>
                <p className="text-gray-600">{business.mobile}</p>
              </div>
              <div className="absolute top-0 right-0 mt-2">
                <span className="absolute rounded-full bg-white w-6 h-6 right-5 top-[10px] flex items-center justify-center text-lg font-medium">
                  {index + 1}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 64 64"
                  viewBox="0 0 64 64"
                  id="premium-product"
                  className="h-16 w-16"
                  fill="#FFC403"
                  strokeWidth="1.5"
                  stroke="#FFC403"
                >
                  <path
                    d="M32,43.006c-0.128,0-0.256-0.049-0.354-0.146l-3.213-3.212l-4.207,1.713c-0.123,0.051-0.26,0.049-0.383-0.002
	c-0.122-0.052-0.219-0.149-0.269-0.272L21.912,37H17.5c-0.276,0-0.5-0.224-0.5-0.5v-4.542l-4.187-1.764
	c-0.122-0.052-0.219-0.149-0.269-0.272c-0.05-0.123-0.05-0.26,0.002-0.383l1.713-4.065l-3.119-3.12
	c-0.195-0.195-0.195-0.512,0-0.707l3.212-3.212l-1.713-4.208c-0.104-0.256,0.019-0.547,0.274-0.651L17,11.912V7.5
	C17,7.224,17.224,7,17.5,7h4.543l1.764-4.187c0.052-0.122,0.149-0.219,0.272-0.269c0.123-0.051,0.261-0.049,0.383,0.002l4.064,1.713
	l3.12-3.119c0.195-0.195,0.512-0.195,0.707,0l3.213,3.212l4.207-1.713c0.123-0.051,0.26-0.049,0.383,0.002
	c0.122,0.052,0.219,0.149,0.269,0.272L42.088,7H46.5C46.776,7,47,7.224,47,7.5v4.542l4.187,1.764
	c0.122,0.052,0.219,0.149,0.269,0.272c0.05,0.123,0.05,0.26-0.002,0.383l-1.713,4.065l3.119,3.12c0.195,0.195,0.195,0.512,0,0.707
	l-3.212,3.212l1.713,4.208c0.104,0.256-0.019,0.547-0.274,0.651L47,32.088V36.5c0,0.276-0.224,0.5-0.5,0.5h-4.543l-1.764,4.187
	c-0.052,0.122-0.149,0.219-0.272,0.269c-0.123,0.051-0.26,0.049-0.383-0.002l-4.064-1.713l-3.12,3.119
	C32.256,42.957,32.128,43.006,32,43.006z M28.553,38.559c0.13,0,0.258,0.051,0.354,0.146L32,41.799l3.004-3.003
	c0.145-0.144,0.36-0.187,0.548-0.107l3.914,1.649l1.698-4.032C41.242,36.121,41.424,36,41.625,36H46v-4.248
	c0-0.203,0.123-0.386,0.312-0.463l3.935-1.602l-1.649-4.052c-0.076-0.186-0.033-0.4,0.109-0.542L51.799,22l-3.004-3.004
	c-0.144-0.144-0.187-0.36-0.107-0.548l1.649-3.915l-4.031-1.698C46.12,12.757,46,12.576,46,12.375V8h-4.248
	c-0.203,0-0.387-0.123-0.463-0.312l-1.602-3.934l-4.052,1.649c-0.185,0.076-0.399,0.033-0.542-0.109L32,2.201l-3.004,3.003
	c-0.144,0.144-0.361,0.187-0.548,0.107l-3.914-1.649l-1.698,4.032C22.758,7.879,22.576,8,22.375,8H18v4.248
	c0,0.203-0.123,0.386-0.312,0.463l-3.935,1.602l1.649,4.052c0.076,0.186,0.033,0.4-0.109,0.542L12.201,22l3.004,3.004
	c0.144,0.144,0.187,0.36,0.107,0.548l-1.649,3.915l4.031,1.698C17.88,31.243,18,31.424,18,31.625V36h4.248
	c0.203,0,0.387,0.123,0.463,0.312l1.602,3.934l4.052-1.649C28.425,38.571,28.489,38.559,28.553,38.559z"
                  ></path>
                  <path
                    d="M32,36c-7.72,0-14-6.28-14-14S24.28,8,32,8s14,6.28,14,14S39.72,36,32,36z M32,9c-7.168,0-13,5.832-13,13s5.832,13,13,13
	s13-5.832,13-13S39.168,9,32,9z"
                  ></path>
                  <path d="M29.172 29.692c-.128 0-.256-.049-.354-.146l-6.364-6.364c-.195-.195-.195-.512 0-.707l2.121-2.122c.188-.188.52-.188.707 0l3.89 3.889 9.546-9.546c.195-.195.512-.195.707 0l2.121 2.121c.195.195.195.512 0 .707L29.525 29.546C29.428 29.644 29.3 29.692 29.172 29.692zM23.515 22.829l5.657 5.657 11.313-11.314-1.414-1.414-9.546 9.546c-.195.195-.512.195-.707 0l-3.89-3.889L23.515 22.829zM42.571 62.996c-.201 0-.383-.121-.461-.306l-9.06-21.502c-.107-.255.013-.548.267-.655.257-.106.548.013.655.267l8.591 20.39 2.744-6.741c.05-.123.146-.221.269-.272.123-.051.26-.052.383-.002l6.741 2.744L44.18 36.694c-.107-.255.013-.548.267-.655.256-.106.548.013.655.267l8.989 21.337c.078.187.037.402-.105.546-.142.144-.357.188-.544.111l-7.396-3.011-3.011 7.396c-.076.188-.258.31-.46.312C42.573 62.996 42.572 62.996 42.571 62.996zM21.423 62.996c-.001 0-.002 0-.003 0-.202-.001-.384-.124-.46-.312l-3.012-7.396L10.553 58.3c-.257.105-.548-.019-.651-.274-.104-.256.019-.547.274-.651l7.858-3.2c.255-.106.547.018.651.274l2.745 6.741 8.592-20.394c.108-.255.403-.371.655-.267.254.107.374.4.267.655L21.884 62.69C21.806 62.875 21.624 62.996 21.423 62.996zM11.91 54.667c-.064 0-.131-.013-.194-.039-.254-.107-.374-.4-.267-.655l.753-1.788c.108-.255.398-.374.655-.267.254.107.374.4.267.655l-.753 1.788C12.29 54.553 12.105 54.667 11.91 54.667zM13.739 50.327c-.065 0-.131-.013-.194-.039-.254-.107-.374-.4-.267-.655l5.614-13.327c.108-.255.402-.372.655-.267.254.107.374.4.267.655L14.2 50.021C14.119 50.212 13.935 50.327 13.739 50.327z"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Services />
      <section className="lg:px-[150px] lg:py-[30px] px-2 py-4 pb-[156px] bg-yellow-100 flex flex-col items-center">
        <h2 className="uppercase font-semibold text-5xl">Client Review</h2>
        <p className="font-Montserrat pt-4">
          Best Affordable services Provider
        </p>
        {/* <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-12">
          {reviewsWithProvider.map((review) => (
            <ReviewCart
              key={review._id.toString()}
              businessName={review.provider.businessName}
              review={review.review}
              image={review.userId.image}
              name={review.userId.name}
              address={review.userId.address}
              date={review.createdAt.toString().slice(0, 10)}
            />
          ))}
        </div> */}
      </section>
    </>
  );
}
