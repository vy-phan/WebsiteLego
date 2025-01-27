import React, { useState } from 'react';

const Creativity = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    const images = [
        // Các mục hiện có
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt307cde4b13df615f/UGC-Page-2404-SW-5-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 1",
            title: "Star Wars Creation",
            creator: "LEGO Master Builder",
            likes: 1234
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt8e39523b1c40b1a4/UGC-Page-2312-Type-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 2",
            title: "Typewriter Classic",
            creator: "Creative Builder",
            likes: 856
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/bltf5ee37888d3078db/UGC-Page-2312-Orc-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 3",
            title: "Fantasy Creature",
            creator: "Brick Artist",
            likes: 2045
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt38651ee013d5d56f/UGC-Page-2312-Ti-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 4",
            title: "Mechanical Wonder",
            creator: "Tech Builder",
            likes: 1567
        },
        // Các mục mới thêm
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blta255df89f8a8df00/UGC-Page-2312-Globe-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 5",
            title: "Creative Build 1",
            creator: "Innovative Builder",
            likes: 980
        },
        {
            src: "https://tse2.mm.bing.net/th?id=OIP.UlWdWvlfS6ZNvYBJkYk0AQHaI7&w=474&h=474&c=7",
            alt: "LEGO Creation 6",
            title: "Creative Build 2",
            creator: "Master Creator",
            likes: 1120
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt6e06bc88b2b4f0a2/UGC-Page-2404-SW-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 7",
            title: "Creative Build 3",
            creator: "Artistic Builder",
            likes: 875
        },
        {
            src: "https://www.lego.com/cdn/cs/set/assets/blt576a66594fb16dee/UGC-Page-2404-SW-2-Grid-Image.jpg?format=webply&quality=80&dpr=1",
            alt: "LEGO Creation 8",
            title: "Creative Build 4",
            creator: "Innovative Creator",
            likes: 1340
        }
    ];
    

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-black h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://www.lego.com/cdn/cs/set/assets/bltf5ee37888d3078db/UGC-Page-2312-Orc-Grid-Image.jpg?format=webply&quality=80&dpr=1"
                        alt="Hero"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-4">LEGO Creativity Gallery</h1>
                        <p className="text-xl text-gray-200">Discover amazing creations from our community</p>
                    </div>
                </div>
            </div>

            {/* View Mode Buttons */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${viewMode === 'grid'
                                ? 'bg-yellow-500 text-white shadow-lg transform -translate-y-1'
                                : 'bg-white text-gray-700 hover:bg-yellow-100'
                            }`}
                    >
                        Grid View
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${viewMode === 'list'
                                ? 'bg-yellow-500 text-white shadow-lg transform -translate-y-1'
                                : 'bg-white text-gray-700 hover:bg-yellow-100'
                            }`}
                    >
                        List View
                    </button>
                </div>
            </div>

            {/* Gallery */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-lg bg-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="aspect-w-4 aspect-h-3">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="text-lg font-bold">{image.title}</h3>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm opacity-90">By {image.creator}</p>
                                            <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm">{image.likes.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800">{image.title}</h3>
                                    <p className="text-sm text-gray-600">By {image.creator}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">{image.likes.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for enlarged image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full">
                        <button
                            className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
                            onClick={(e) => {
                                e.stopPropagation();

                                setSelectedImage(null);
                            }}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full h-auto object-contain rounded-lg"
                        />
                        <div className="mt-4 text-center text-white">
                            <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                            <p className="text-sm mt-1">By {selectedImage.creator}</p>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>{selectedImage.likes.toLocaleString()} likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Creativity;
