import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card'
import BuiltByYou from '../components/BuiltByYou'
import Feedback from '../components/Feedback'
import CardProduct from '../components/CardProduct'
import useGetProducts from '../hooks/useGetProducts'
import { Link } from 'react-router-dom'
import Newleater from '../components/Newleater'

const Home = () => {
    const productes = [
        {
            image: "https://www.lego.com/cdn/cs/set/assets/blt52ff77f27e638ba8/Architecture-202406-Theme-Preview.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=1.5",
            title: "Pay tribute to the iconic LOVE sculpture",
            description: "Build and display the LEGO® Art LOVE set in your home."
        },
        {
            image: "https://www.lego.com/cdn/cs/set/assets/bltbc28f2147f7a8e05/Brickheadz-202412-Theme-Preview.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=1.5",
            title: "Create a striking centerpiece",
            description: "Craft a vibrant oasis with the new LEGO® Icons Fountain Garden set."
        },
        {
            image: "https://www.lego.com/cdn/cs/set/assets/bltce2608a1232e519d/City-202401-Theme-Preview.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=1.5s",
            title: "New LEGO® Icons Tudor Corner",
            description: "Explore an all new modular set filled with captivating stories."
        }
    ];

    const { products, loading, error, fetchProducts } = useGetProducts();


    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>;
    if (error) return <p className="text-red-500 text-center">{error.message}</p>;

    return (
        <>
            {/* banner chinh */}
            <Banner />

            {/* quan cao phụ  */}
            <section className="bg-gray-100 py-16">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Just in this month</h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
                        {productes.map((product, index) => (
                            <div key={index}>
                                <Card {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* hiển thị sảnn phẩm random  */}
            <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4">
                    {products
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4)
                        .map((product, index) => (
                            <div key={index}>
                                <CardProduct {...product} />
                            </div>
                        ))}
                </div>

            </div>
            
            <div className="text-center mt-12">
                <Link to="/discover" className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
                    SEE MORE
                </Link>
            </div>


            {/* giới thiệu cửa hàng */}
            <BuiltByYou />

            {/* báo lá  cãi */}
            <Newleater />

            {/* đánh giá */}
            <Feedback />

        </>
    )
}

export default Home