import { useEffect, useState } from "react"
import { FaArrowLeft, FaImage, } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductDetails } from "../../redux/slices/productSlice"
import { updateProduct } from "../../redux/slices/adminProductSlice"
import Loading from "../Loading"


const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { selectedProduct, loading, error } = useSelector((state) => state.products)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", discountPrice: "", countInStock: "", category: "", brand: "", sizes: [], colors: [], collections: "", material: "", gender: "", isFeatured: false, isPublished: false, tags: [],
    length: "", width: "", height: "",
    weight: "", sku: ""
  })

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [newImagePreviews, setNewImagePreviews] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        discountPrice: selectedProduct.discountPrice || "",
        countInStock: selectedProduct.countInStock || "",
        sku: selectedProduct.sku || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        collections: selectedProduct.collections || "",
        material: selectedProduct.material || "",
        gender: selectedProduct.gender || "",
        isFeatured: selectedProduct.isFeatured || false,
        isPublished: selectedProduct.isPublished || false,
        length: selectedProduct.dimensions?.length,
        width: selectedProduct.dimensions?.width,
        height: selectedProduct.dimensions?.height,
        weight: selectedProduct.weight || "",
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        tags: selectedProduct.tags || [],
      });
      setExistingImages(selectedProduct.images || [])
    }
  }, [selectedProduct])


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prev) => ({ ...prev, [name]: checked }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = async (e) => {
    const selectedImages = Array.from(e.target.files)
    const totalImages = existingImages.length + newImages.length + selectedImages.length;
    if (totalImages > 5) {
      toast.warning("You can upload maximum 5 images.");
      return;
    }
    setNewImages((prev) => [...prev, ...selectedImages]);
    const previews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    )
    setNewImagePreviews((prev) => [...prev, ...previews])
    e.target.value = "";
  }

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  const removeNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index))
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoad(true)
      const data = new FormData()
      data.append("name", formData.name)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("discountPrice", formData.discountPrice)
      data.append("countInStock", formData.countInStock)
      data.append("category", formData.category)
      data.append("brand", formData.brand)
      data.append("collections", formData.collections)
      data.append("material", formData.material)
      data.append("gender", formData.gender)
      data.append("isFeatured", String(formData.isFeatured))
      data.append("isPublished", String(formData.isPublished))
      data.append("weight", formData.weight)
      data.append("sku", formData.sku)
      data.append("dimensions", JSON.stringify({
        length: formData.length,
        width: formData.width,
        height: formData.height
      }))
      data.append("sizes", JSON.stringify(formData.sizes))
      data.append("colors", JSON.stringify(formData.colors))
      data.append("tags", JSON.stringify(formData.tags))
      data.append("existingImages", JSON.stringify(existingImages))
      newImages.forEach((image) => {
        data.append("images", image)
      })

      await dispatch(updateProduct({ id, productData: data })).unwrap()
      toast.success("Edited product successfully")
      navigate("/admin/products")
    } catch (error) {
      toast.error(error || "Failed to update product")
      console.log(error);
    } finally {
      setLoad(false)
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center">Error : {error}</div>
  }

  return (
    <div className="pb-10 mb-25 md:mb-0">
      {/* Back */}
      <div className="mb-8">
        <Link to="/admin/products" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600"><FaArrowLeft size={12} /> Back to products</Link>
        <h1 className="text-3xl font-bold text-gray-900">Update product</h1>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-5 border-b border-gray-100 pb-3 text-lg font-bold text-gray-900">Product information</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product name
                <span className="text-red-500">*</span>
              </span>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. Classic linen shirt" required />
            </label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold text-gray-700">SKU <span className="text-red-500">*
            </span>
            </span>
              <input name="sku" value={formData.sku} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. SHIRT-LINEN-001" required />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                Description
                <span className="text-red-500">*</span>
              </span>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Describe the product for your customers..." required />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                Category
                <span className="text-red-500">*</span>
              </span>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required>
                <option value="">Select category</option>
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
              </select>
            </label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold text-gray-700">Collection
              <span className="text-red-500">*
              </span>
            </span>
              <input name="collections" value={formData.collections} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. Activewear Collection" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Brand
              </span>
              <input name="brand" value={formData.brand} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. Beach Breeze" />
            </label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold text-gray-700">Material
            </span>
              <input name="material" value={formData.material} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. Viscose" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                Gender
                <span className="text-red-500">*</span>
              </span>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option value="">
                  Select gender
                </option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-5 border-b border-gray-100 pb-3 text-lg font-bold text-gray-900">
            Pricing and inventory</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Price
                <span className="text-red-500">*</span>
              </span>
              <input name="price" value={formData.price} onChange={handleChange} type="number" min={0} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="0.00" required />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Discount price</span>
              <input name="discountPrice" type="number" value={formData.discountPrice} onChange={handleChange} min={0} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Optional" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Count in stock</span>
              <input name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="0" min={0} />
            </label>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Sizes<span className="text-red-500">* (comma-separated)</span></span>
              </div>
              <div className="flex gap-2">
                <input name="sizes" value={formData.sizes.join(", ")} onChange={(e) => setFormData({
                  ...formData, sizes: e.target.value.split(",").map((size) => size.trim())
                })} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. M,X" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Colors<span className="text-red-500"> *(comma-separated)</span></span>
              </div>
              <div className="flex gap-2">
                <input name="colors" value={formData.colors.join(", ")} onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(",").map((color) => color.trim()) })} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. Navy,Orange" />
              </div>
            </div>
            <div><div className="mb-1.5 flex items-center justify-between">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Tags <span className="text-gray-500">(comma-separated)</span></span>
            </div>
              <div className="flex gap-2">
                <input name="tags" value={formData.tags.join(", ")} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map((tag) => tag.trim()) })} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g. summer" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <div
            ><h2 className="text-lg font-bold text-gray-900">Product images</h2>
              <p className="mt-1 text-xs text-gray-500">Upload JPG, PNG, or WEBP images.</p>
            </div>
            <FaImage className="text-xl text-gray-400" />
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center hover:border-blue-400 hover:bg-blue-50">
            <FaImage className="mb-3 text-2xl text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">Choose product images</span>
            <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={handleImageChange} />
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-wrap mt-4">
            {
              existingImages.length > 0 ? (
                existingImages.map((image, index) => (
                  <div key={index} className=" relative ">
                    <img src={image.url} alt={image.altText} className="w-full h-50 object-cover rounded-lg" />
                    <button type="button" className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full cursor-pointer text-[10px] text-center" onClick={() => removeExistingImage(index)}>X</button>
                  </div>
                ))
              ) : (
                <div className="">Image preview</div>
              )
            }
            {
              newImagePreviews &&
              newImagePreviews.map((image, index) => (
                <div key={index} className=" relative ">
                  <img src={image} alt={`New ${index + 1}`} className="w-full h-50 object-cover rounded-lg" />
                  <button type="button" className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full cursor-pointer text-[10px] text-center" onClick={() => removeNewImage(index)}>X</button>
                </div>
              ))

            }
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-5 border-b border-gray-100 pb-3 text-lg font-bold text-gray-900">Additional details</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4"
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Length</span>
              <input name="length" value={formData.length} onChange={handleChange} type="number" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="cm" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Width</span>
              <input name="width" type="number" value={formData.width} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="cm" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Height</span>
              <input name="height" value={formData.height} onChange={handleChange} type="number" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="cm" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Weight</span>
              <input name="weight" value={formData.weight} onChange={handleChange} type="number" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="grams" />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input type="checkbox" value={formData.isFeatured} onChange={handleChange} name="isFeatured" className="h-4 w-4 accent-blue-600" />
              Featured product
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input type="checkbox" value={formData.isPublished} onChange={handleChange} name="isPublished" className="h-4 w-4 accent-blue-600" /> Publish immediately
            </label>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/admin/products" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel
          </Link>
          <button type="submit" disabled={load} className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {load ? "Updating...." : "Update product"}</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage
