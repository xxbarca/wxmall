const CellTagStatus = {
    FORBIDDEN: "forbidden",
    SELECTED: "selected",
    WAITING: "waiting"
}

const ShoppingWay = {
    CART: 'cart',
    BUY: 'buy'
}

const SpuListType = {
	THEME: 'theme',
	ROOT_CATEGORY: 'root_category',
	SUB_CATEGORY: 'sub_category',
	LATEST: 'latest'
}

const AuthAddress = {
	NOT_AUTH: "not_auth",
	DENY: "deny",
	AUTHORIZED: "authorized"
}

const OrderExceptionType = {
	BEYOND_STOCK: 'beyond_stock',
	BEYOND_SKU_MAX_COUNT: 'beyond_sku_max_count',
	BEYOND_ITEM_MAX_COUNT: 'beyond_item_max_count',
	SOLD_OUT: 'sold_out',
	NOT_ON_SALE: 'not_on_sale',
	EMPTY: 'empty'
}

export {
    CellTagStatus,
    ShoppingWay,
	SpuListType,
	AuthAddress,
	OrderExceptionType
}
