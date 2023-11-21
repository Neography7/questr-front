import { Spinner } from "flowbite-react";

export default function Loading () {

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
                <div className="text-center">
                    <Spinner size="xl" aria-label="Center-aligned spinner" />
                </div>
            </div>
        </>
    );

}