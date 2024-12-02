import React from 'react'

export function Products() {
  return (
    <div className="w-full text-white">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 gap-6">
        <ProductCard name="Chocolate Cake" price="$29.99" stock={50} />
        <ProductCard name="Vanilla Cupcakes" price="$19.99" stock={100} />
        <ProductCard name="Strawberry Cheesecake" price="$34.99" stock={25} />
      </div>
    </div>
  )
}

function ProductCard({ name, price, stock }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-300">Price: {price}</p>
      <p className="text-gray-300">Stock: {stock}</p>
    </div>
  )
}

