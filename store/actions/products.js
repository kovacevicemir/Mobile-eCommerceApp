//ACTION NAMES
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

//ACTION CREATORS
export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, payload:productId}
}
