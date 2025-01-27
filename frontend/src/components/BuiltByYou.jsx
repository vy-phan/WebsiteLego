import React from 'react'
import { Link } from 'react-router-dom';

const BuiltByYou = () => {
    const images = [
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt307cde4b13df615f/UGC-Page-2404-SW-5-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 1"
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt8e39523b1c40b1a4/UGC-Page-2312-Type-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 2"
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/bltf5ee37888d3078db/UGC-Page-2312-Orc-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 3"
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt38651ee013d5d56f/UGC-Page-2312-Ti-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 4"
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-4">Built by You</h2>
                <p className="text-center text-gray-600 mb-12">
                    Post your photos to Instagram and mention @LEGO in the caption for a chance to be featured on the website and shop the sets you like below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to="/discover"
                                    className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                                >
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/creativity"
                        className="inline-flex items-center justify-center rounded-full bg-gray-600 px-8 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BuiltByYou
