import React, { useEffect, useMemo, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { ShopContext } from '../Context/ShopContext'
import './AdminProducts.css'

const defaultForm = {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    rating: 0,
    category: '',
    features: [],
    images: [],
    isActive: true,
    isFeatured: false,
    isNewProduct: false
}

const AdminProducts = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(defaultForm)
    const [imageFiles, setImageFiles] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])

    // Fallback to catalog when API unavailable
    const catalog = React.useContext(ShopContext)?.products || []

    const fetchProducts = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await axiosClient.get('/products')
            setProducts(Array.isArray(res.data) ? res.data : res.data?.data || [])
        } catch (e) {
            // Fallback to local catalog
            setProducts(catalog)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const visibleColumns = useMemo(() => [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price' },
        { key: 'stock', label: 'Stock' },
        { key: 'category', label: 'Category' }
    ], [])

    const resetForm = () => {
        setForm(defaultForm)
        setEditing(null)
        setShowForm(false)
        setImageFiles([])
        setImagePreviews([])
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImageFiles(files)
        
        // Create previews
        const previews = files.map(file => URL.createObjectURL(file))
        setImagePreviews(previews)
        
        // Do not override existing image URLs in form.images here; we only track selected files separately
    }

    const removeImage = (index) => {
        const newFiles = imageFiles.filter((_, i) => i !== index)
        const newPreviews = imagePreviews.filter((_, i) => i !== index)
        
        // Revoke the URL to free memory
        URL.revokeObjectURL(imagePreviews[index])
        
        setImageFiles(newFiles)
        setImagePreviews(newPreviews)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name === 'features') {
            const list = value.split(',').map(s => s.trim()).filter(Boolean)
            setForm(prev => ({ ...prev, features: list }))
        } else if (name === 'images') {
            const list = value.split(',').map(s => s.trim()).filter(Boolean)
            setForm(prev => ({ ...prev, images: list }))
        } else if (type === 'number') {
            setForm(prev => ({ ...prev, [name]: Number(value) }))
        } else if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: checked }))
        } else {
            setForm(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const formData = new FormData()
            // Append scalar fields
            formData.append('name', form.name)
            formData.append('price', String(form.price))
            formData.append('description', form.description || '')
            formData.append('stock', String(form.stock || 0))
            formData.append('rating', String(form.rating || 0))
            formData.append('category', form.category || '')
            if (form.brand) formData.append('brand', form.brand)
            // Append features as JSON string
            formData.append('features', JSON.stringify(form.features || []))
            // If any image URLs were prefilled in form (rare in create), send them along
            if (Array.isArray(form.images) && form.images.length > 0) {
                formData.append('images', JSON.stringify(form.images))
            }
            // Append selected files under field name 'images'
            imageFiles.forEach(file => formData.append('images', file))

            const res = await axiosClient.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const created = res.data?.data || res.data
            setProducts(prev => [created, ...prev])
            resetForm()
        } catch (e) {
            setError('Failed to create product')
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (p) => {
        setEditing(p)
        // Map possible image fields
        const images = Array.isArray(p.images) ? p.images : (p.image ? [p.image] : [])
        setForm({ ...defaultForm, ...p, images })
        setImageFiles([])
        setImagePreviews([])
        setShowForm(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!editing) return
        setLoading(true)
        setError('')
        const id = editing._id || editing.id
        try {
            const formData = new FormData()
            // Append scalar fields
            formData.append('name', form.name)
            formData.append('price', String(form.price))
            formData.append('description', form.description || '')
            formData.append('stock', String(form.stock || 0))
            formData.append('rating', String(form.rating || 0))
            formData.append('category', form.category || '')
            if (form.brand) formData.append('brand', form.brand)
            // Append flags if present
            formData.append('isActive', String(!!form.isActive))
            formData.append('isFeatured', String(!!form.isFeatured))
            formData.append('isNewProduct', String(!!form.isNewProduct))
            // Preserve existing image URLs
            formData.append('images', JSON.stringify(form.images || []))
            // Append features as JSON string
            formData.append('features', JSON.stringify(form.features || []))
            // Append any newly selected files
            imageFiles.forEach(file => formData.append('images', file))

            const res = await axiosClient.put(`/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const updated = res.data?.data || res.data
            setProducts(prev => prev.map(p => (String(p._id || p.id) === String(id) ? updated : p)))
            resetForm()
        } catch (e) {
            setError('Failed to update product')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (p) => {
        const id = p._id || p.id
        const prev = products
        setProducts(prev.filter(x => String(x._id || x.id) !== String(id)))
        try {
            await axiosClient.delete(`/products/${id}`)
        } catch (e) {
            // revert on failure
            setProducts(prev)
            setError('Failed to delete product')
        }
    }

    return (
        <div className='admin-products'>
            <div className='admin-products__header'>
                <h2>Products</h2>
                <button className='btn primary' onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm) }}>Add Product</button>
            </div>

            {error && <div className='error'>{error}</div>}

            <div className='admin-products__table-container'>
                <table className='admin-products__table'>
                    <thead>
                        <tr>
                            {visibleColumns.map(col => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && products.length === 0 && (
                            <tr><td colSpan={visibleColumns.length + 1}>Loading...</td></tr>
                        )}
                        {!loading && products.length === 0 && (
                            <tr><td colSpan={visibleColumns.length + 1}>No products</td></tr>
                        )}
                        {products.map((p) => {
                            const id = p._id || p.id
                            const image = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.image || '')
                            return (
                                <tr key={id}>
                                    <td>
                                        {image ? <img className='admin-products__thumb' src={image} alt={p.name} /> : <div className='thumb-placeholder'>No image</div>}
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{typeof p.price === 'string' ? p.price : `KES${p.price}`}</td>
                                    <td>{p.stock ?? 0}</td>
                                    <td>{p.category || '-'}</td>
                                    <td className='actions'>
                                        <button className='btn' onClick={() => startEdit(p)}>Edit</button>
                                        <button className='btn danger' onClick={() => handleDelete(p)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className='modal'>
                    <div className='modal__content'>
                        <div className='modal__header'>
                            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
                            <button className='icon-btn' onClick={resetForm}>×</button>
                        </div>
                        <form onSubmit={editing ? handleUpdate : handleCreate} className='product-form'>
                            <div className='grid-2'>
                                <label>
                                    <span>Name</span>
                                    <input name='name' value={form.name} onChange={handleChange} required />
                                </label>
                                <label>
                                    <span>Price</span>
                                    <input name='price' type='number' step='0.01' value={form.price} onChange={handleChange} required />
                                </label>
                                <label className='grid-col-2'>
                                    <span>Description</span>
                                    <textarea name='description' value={form.description} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Stock</span>
                                    <input name='stock' type='number' value={form.stock} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Category</span>
                                    <input name='category' value={form.category} onChange={handleChange} required />
                                </label>
                                <label>
                                    <span>Brand</span>
                                    <input name='brand' value={form.brand} onChange={handleChange} />
                                </label>
                                <label className='grid-col-2'>
                                    <span>Product Images</span>
                                    <input 
                                        type='file' 
                                        multiple 
                                        accept='image/*' 
                                        onChange={handleImageChange}
                                        className='file-input'
                                    />
                                    {imagePreviews.length > 0 && (
                                        <div className='image-previews'>
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className='image-preview-item'>
                                                    <img src={preview} alt={`Preview ${index + 1}`} className='preview-image' />
                                                    <button 
                                                        type='button' 
                                                        className='remove-image-btn'
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </label>
                                <label>
                                    <span>Features (comma separated)</span>
                                    <input name='features' value={form.features.join(', ')} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Active</span>
                                    <input name='isActive' type='checkbox' checked={!!form.isActive} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Featured</span>
                                    <input name='isFeatured' type='checkbox' checked={!!form.isFeatured} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>New Product</span>
                                    <input name='isNewProduct' type='checkbox' checked={!!form.isNewProduct} onChange={handleChange} />
                                </label>
                            </div>
                            <div className='modal__footer'>
                                <button type='button' className='btn' onClick={resetForm}>Cancel</button>
                                <button type='submit' className='btn primary' disabled={loading}>{editing ? 'Save' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProducts



