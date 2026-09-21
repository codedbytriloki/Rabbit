import { RiDeleteBin3Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice"


const CartContents = ({ userId, guestId, cart }) => {
  const dispatch = useDispatch();

  // handle adding or subtracting to cart
  const handleAddToCart = (productId, dalta, quantity, size, color) => {
    const newQuantity = quantity + dalta;
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size, color
      }))
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, guestId, userId }))
  }

  return (
    <div>
      {
        cart?.products?.map((product, index) => (
          <div key={index} className="flex items-start justify-between py-4 border-b">
            <div className="flex items-start">
              <img src={product.image} alt={product.name} className="w-15 h-20 md:w-20 md:h-24 object-cover mr-4 rounded" />
              <div className="">
                <h3 className="">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  size: {product.size} | color: {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button className="border rounded-full border-gray-400 px-2 text-center  text-xl font-medium bg-black text-white cursor-pointer" onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} >–</button>
                  <span className="mx-3">{product.quantity}</span>
                  <button className="border rounded-full border-gray-400 px-2 text-center bg-black text-white text-xl font-medium cursor-pointer" onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)} >+</button>
                </div>
              </div>
            </div>
            <div className="">
              <p className="">$ {product.price.toLocaleString()}</p>
              <button className="" onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}>
                <RiDeleteBin3Fill className='h-6 w-6 mt-8 md:mt-10 text-red-600' />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CartContents