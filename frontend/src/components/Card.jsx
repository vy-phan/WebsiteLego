import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ image, title, description }) => {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    alt={title}
                    src={image}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
                <div className="mt-4">
                    <Link
                        to="/discover"
                        className="text-sm font-medium text-black hover:underline"
                    >
                        Shop now &gt;
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card