"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const frontEndUrl = process.env.NEXT_PUBLIC_API_URL;

if (!frontEndUrl) {
    throw new Error("Frontend URL is not defined");
}

function UnsubscribeContent() {
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);
    const searchParams = useSearchParams();

    const userID = searchParams.get("id");

    const handleUnsubscribe = async () => {
        const res = await fetch(frontEndUrl + `users/${userID}/unsubscribe`);
        if (res.ok) {
            setIsUnsubscribed(true);
        } else {
            Swal.fire({
                icon: "error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 mx-4 md:mx-0">
                {!isUnsubscribed ? (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">
                            Confirm Unsubscribe
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We understand that you might not want to receive our emails
                            anymore. By unsubscribing, you will no longer receive updates
                            about our latest news, offers, or promotions.
                        </p>
                        <p className="text-gray-600 mb-8">
                            Are you sure you want to unsubscribe? If you change your mind, you
                            can always resubscribe later.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button
                                onClick={handleUnsubscribe}
                                className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition focus:outline-none focus:ring-4 focus:ring-red-300"
                            >
                                Yes, Unsubscribe
                            </button>
                            <a
                                href="/"
                                className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition focus:outline-none focus:ring-4 focus:ring-gray-300"
                            >
                                No, Go Back
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">
                            You&apos;ve Been Unsubscribed
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We&apos;re sorry to see you go! You will no longer receive our
                            emails. If this was a mistake, you can easily resubscribe by
                            visiting our website.
                        </p>
                        <p className="text-gray-600 mb-8">
                            If you have any feedback about why you&apos;re leaving, we&apos;d
                            love to hear from you. Feel free to reach out to us at
                            <a
                                href="mailto:support@example.com"
                                className="text-blue-500 underline"
                            >
                                support@example.com
                            </a>
                            .
                        </p>
                        <a
                            href="/"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Go to Homepage
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Unsubscribe() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnsubscribeContent />
        </Suspense>
    );
}
