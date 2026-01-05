import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="group relative flex h-full w-64 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-40px_rgba(2,6,23,0.45)]"
        >
            <div className="relative flex h-40 w-full items-center justify-center bg-gradient-to-b from-slate-50 to-white p-3">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="h-full w-full object-contain"
                    width={200}
                    height={160}
                />

                <button className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/90 shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                    <Image
                        className="h-5 w-5 opacity-80"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <div className="flex w-full flex-1 flex-col p-5">
                <p className="w-full truncate text-base font-semibold text-slate-900 md:text-lg">{product.name}</p>
                <p className="mt-1 h-[40px] overflow-hidden text-sm leading-relaxed text-slate-600">{product.description}</p>
                
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-4 w-4"
                                src={
                                    index < Math.floor(4)
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt="star_icon"
                            />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{4.5}</span>
                </div>

                <div className="mt-auto flex min-w-0 items-center justify-between gap-3 pt-5">
                    <p className="min-w-0 truncate text-xl font-extrabold tracking-tight text-slate-900">{currency}{product.offerPrice}</p>
                    <button className="inline-flex h-10 shrink-0 min-w-[132px] items-center justify-center rounded-lg bg-purple-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-400/50">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard