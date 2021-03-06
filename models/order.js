import {OrderException} from "../core/order-exception"
import {OrderExceptionType, OrderStatus} from "../core/enum"
import {accAdd} from "../utils/number"
import {Http} from "../utils/http"

class Order {
	
	orderItems
	localItemCount
	
	constructor(orderItems, localItemCount) {
		this.orderItems = orderItems
		this.localItemCount = localItemCount
	}
	
	/**
	 * 校验orderItem是否合法
	 * */
	checkOrderIsOk() {
		this.orderItems.forEach(item => {
			item.isOK()
		})
	}
	
	_orderIsOk() {
		this._emptyOrder()
		this._containNotOnSaleItem()
	}
	
	/**
	 * 当前订单是否是空的订单
	 * */
	_emptyOrder() {
		if (this.orderItems.length === 0) {
			throw new OrderException("订单中没有任何商品", OrderExceptionType.EMPTY)
		}
	}
	
	/**
	 * 按照分类获取总价
	 * @param categoryIdList
	 * */
	getTotalPriceByCategoryIdList(categoryIdList) {
		if (categoryIdList.length === 0) {
			return 0
		}
		const price = categoryIdList.reduce((pre, cur) => {
			const eachPrice = this.getTotalPriceEachCategory(cur)
			return accAdd(pre, eachPrice)
		}, 0)
		return price
	}
	
	/**
	 * 各分类商品总价格
	 * */
	getTotalPriceEachCategory(categoryId) {
		const price = this.orderItems.reduce((pre, orderItem) => {
			const itemCategoryId = this._isItemInCategories(orderItem, categoryId)
			if (itemCategoryId) {
				return accAdd(pre, orderItem.finalPrice)
			}
			return pre
		}, 0)
		return price
	}
	
	_isItemInCategories(orderItem, categoryId) {
		if (orderItem.categoryId === categoryId) {
			return true
		}
		if (orderItem.rootCategoryId === categoryId) {
			return true
		}
		return false
	}
	
	/**
	 * 是否包含下架商品
	 * */
	_containNotOnSaleItem() {
		if (this.orderItems.length !== this.localItemCount) {
			throw new OrderException("服务器返回订单商品数量与实际不相符", OrderExceptionType.NOT_ON_SALE)
		}
	}
	
	getTotalPrice() {
		return this.orderItems.reduce((pre, item) => {
			const price = accAdd(pre, item.finalPrice)
			return price
		}, 0)
	}
	
	static async postOrderToServer(orderPost) {
		return await Http.request({
			url: '/order',
			method: "POST",
			data: orderPost,
			throwError: true
		})
	}
	
	getOrderSkuInfoList() {
		
		return this.orderItems.map(item => {
			return {
				id: item.skuId,
				count: item.count
			}
		})
	}
	
	/**
	 * 获取待发货订单数量
	 * */
	static async getPaidCount() {
		const data = await Http.request({
			url: `/order/by/status/${OrderStatus.PAID}`
		})
		return data.total
	}
	
	/**
	 * 获取未支付订单数量
	 * */
	static async getUnpaidCount() {
		const data = await Http.request({
			url: `/order/status/unpaid`
		})
		return data.total
	}
	
	/**
	 * 获取所有已发货订单数量
	 * */
	static async getDeliveredCount() {
		const data = await Http.request({
			url: `/order/by/status/${OrderStatus.DELIVERED}`
		})
		return data.total
	}
}

export {
	Order
}
