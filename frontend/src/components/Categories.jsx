import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "LEGO Star Wars™",
            image: "https://th.bing.com/th/id/R.ae08ec6bfde9b9b91dcb86cdd8d9aa2d?rik=7giYDvgck14s3Q&riu=http%3a%2f%2f2.bp.blogspot.com%2f_BWXh-5GBWTA%2fTPQu5zASWAI%2fAAAAAAAAC9g%2fsgtyqlzIB60%2fs1600%2fLegoStarWars_1.jpg&ehk=ahIKdRPDB85x7aqKnYKb63QQJcab0MJDcDHoLRFC464%3d&risl=&pid=ImgRaw&r=0",
            description: "Build epic space adventures",
            link: "/category/star-wars"
        },
        {
            id: 2,
            name: "LEGO Technic™",
            image: "https://www.meme-arsenal.com/memes/8c519e9b2bc67932865789e449585d1b.jpg",
            description: "Advanced building for real mechanics",
            link: "/category/technic"
        },
        {
            id: 3,
            name: "LEGO City",
            image: "https://th.bing.com/th/id/R.80622d87d11aa5700f84444db3551600?rik=%2bV8kDgAsI4k61A&pid=ImgRaw&r=0",
            description: "Create your urban adventures",
            link: "/category/city"
        },
        {
            id: 4,
            name: "LEGO Harry Potter™",
            image: "https://th.bing.com/th/id/OIP.2vG9IbeMGne97fwtsVNiBAHaEK?rs=1&pid=ImgDetMain",
            description: "Magical building experiences",
            link: "/category/harry-potter"
        }
    ];

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">LEGO Themes</h2>
                <p className="text-gray-600 text-center mb-12">Explore our amazing collection of LEGO sets</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link 
                            to={category.link} 
                            key={category.id}
                            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                                        {category.name}
                                    </h3>
                                    <p className="text-white/80 text-sm transform group-hover:-translate-y-1 transition-transform duration-300">
                                        {category.description}
                                    </p>
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1 transition-all duration-300">
                                        <span className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium">
                                            Explore Sets →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;