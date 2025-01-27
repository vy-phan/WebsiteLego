import React from 'react'

const Banner = () => {
    return (
        <section
            className="relative bg-[url(https://www.lego.com/cdn/cs/set/assets/blt32c688705a3b7cff/Botanicals_Desktop.png?format=webply&fit=crop&quality=70&width=1600&height=700&dpr=1.5)] bg-cover bg-center bg-no-repeat h-screen"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

            <div className="relative h-full flex items-center justify-end">
                <div className="mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:px-8">
                    <div className="text-white space-y-6">
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                            Forever flowers
                        </h1>

                        <p className="text-lg md:text-xl max-w-lg drop-shadow-md">
                            Discover blooms for all occasions with LEGO® Botanicals sets.
                        </p>

                        <div className="pt-4 flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-gray-100 transition duration-300 ease-in-out"
                            >
                                Shop collection
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner