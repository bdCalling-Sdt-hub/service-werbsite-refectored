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
      revalidate: 86400,
    },
  });

  const result = (await response.json()) as { data: any[] };

  const benefit: {
    [key: string]: { image: string; header: string; benefits: string[] };
  } = {
    customer: {
      image: "/customer.jpg",
      header: "Benefits for customers",
      benefits: [
        "Direct call to service providers",
        "Discount option available from service providers",
        "Price wining option available on feedback",
        "Ask bids of your service providers from your suburb",
      ],
    },
    provider: {
      image: "/provider.jpg",
      header: "Benefits for service providers",
      benefits: [
        "Full referral system",
        "Online booking system",
        "Special promotions",
        "Create work relationships from",
        "Discount Benefits",
        "Full marketing tools with",
      ],
    },
  };

  const reviews = [
    {
      name: "Alice Williams",
      review:
        "A fantastic platform! I was able to quickly find reliable service providers for my home repairs. The process was smooth, and the reviews helped me choose the best option. Highly recommended!",
      rating: 5,
    },
    {
      name: "James Carter",
      review:
        "This website saved me so much time. I found multiple options for cleaning services in my area and could easily contact them through the platform. Very convenient!",
      rating: 5,
    },
    {
      name: "Sophia Lee",
      review:
        "Great experience! The website is user-friendly, and I could compare service providers before making a choice. Got in touch with a few providers, and the response was quick. Will definitely use it again.",
      rating: 5,
    },
  ];

  return (
    <>
      <Header />
      <section className="lg:px-[150px] lg:py-[72px] px-2 py-4 flex lg:flex-row flex-col justify-center gap-16">
        {Object.keys(benefit).map((key, i) => (
          <div key={key} className="flex gap-5">
            <Image
              src={benefit[key as keyof typeof benefit].image}
              alt="customer"
              className="rounded-3xl w-64 hidden lg:block"
              width={300}
              height={1000}
            />
            <div>
              <h3 className="text-2xl lg:text-4xl font-semibold">
                {benefit[key as keyof typeof benefit].header}
              </h3>
              <ul className="my-2 lg:my-5 lg:text-xl font-medium flex flex-col gap-3 ml-5">
                {benefit[key as keyof typeof benefit].benefits.map(
                  (benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-5 w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          viewBox="0 0 24 24"
                          id="star"
                          className="h-5 w-5"
                        >
                          <path
                            fill={i === 0 ? "#efc000" : "#2a5e74"}
                            d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"
                          ></path>
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <section className="lg:px-[150px] lg:py-[72px] px-2 py-4 pb-[156px] bg-yellow-100 flex flex-col items-center">
        <h2 className="uppercase font-semibold text-center text-2xl lg:text-5xl">
          Top 3 service providers of last month
        </h2>
        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {result.data.map((business: any, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl bg-white relative"
            >
              <div className="flex gap-3">
                <div className="w-2/6 flex flex-col gap-2">
                  <Image
                    src="/busnessLogo.png"
                    alt="placeholder"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 w-4/5">
                  <Link href={"/business/" + business.id}>
                    <h3 className="text-xl uppercase lg:text-2xl font-semibold hover:text-green-400 transition-all">
                      {business.name}
                    </h3>
                  </Link>

                  <div className="flex justify-start">
                    {generateStars(5)}
                    {`[${business._count?.reviews}]`}
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {business.user.email}
                  </p>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {business.mobile}
                  </p>
                </div>
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

              <p className="text-gray-700 mt-2 text-sm lg:text-base">
                {business.address}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Services />
      <section className="lg:px-[150px] lg:py-[30px] px-2 py-4 pb-[156px] bg-yellow-100 flex flex-col items-center">
        <h2 className="uppercase font-semibold text-3xl lg:text-5xl">
          Client Reviews
        </h2>
        <p className="font-Montserrat pt-4">
          Best Affordable services Provider
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 w-full justify-between gap-8">
          {reviews.map(({ name, rating, review }, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 mx-auto">
              <div className="flex items-center gap-3">
                <Image
                  src="/busnessLogo.png"
                  alt="placeholder"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-lg">{name}</p>
                  <div className="flex">{generateStars(rating)}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700">{review}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
