
import {Cart} from "../../models/cart"
import {Calculator} from "../../models/calculator"

const cart = new Cart()

Page({
	
    data: {
	    cartItems: [],
	    isEmpty: false,
	    totalPrice: 0,
	    totalSkuCount: 0,
	    allChecked: false,
    },
	
	onCheckAll: function(options) {
    	const checked = options.detail.checked
		cart.checkAll(checked)
		this.setData({
			cartItems: cart.getAllCartItemFromLocal().items
		})
		this.refreshCartData()
	},
	
	isAllChecked() {
		this.setData({
			allChecked: cart.isAllChecked()
		})
	},
	
	onLoad: async function() {
    	const cartItem = await cart.getAllSkuFromServer()
		this.setData({
			cartItems: cartItem.items
		})
	},
	
	onShow: async function (options) {
		const cartItems = cart.getAllCartItemFromLocal().items
		if (cart.isEmpty()) {
			this.empty()
			return
		}
		this.setData({
			cartItems
		})
		this.notEmpty()
		this.isAllChecked()
		this.refreshCartData()
	},
	
	refreshCartData() {
    	const checkedItems = cart.getCheckedItems()
		const calculator = new Calculator(checkedItems)
		
		calculator.calc()
		this.setCalcData(calculator)
	},
	
	setCalcData(calculator) {
    	const totalPrice = calculator.getTotalPrice()
		const totalSkuCount = calculator.getTotalSkuCount()
		this.setData({
			totalPrice,
			totalSkuCount
		})
	},
	
	onSingleCheck: function(event) {
		this.isAllChecked()
		this.refreshCartData()
	},
	
	onDeleteItem: function(event) {
		this.isAllChecked()
		this.refreshCartData()
	},
	
	onCountFloat: function() {
    	console.log(123)
    	this.refreshCartData()
	},
	
	empty() {
    	this.setData({
		    isEmpty: true
	    })
		wx.hideTabBarRedDot({
			index: 2
		})
	},
	
	notEmpty() {
    	this.setData({
		    isEmpty: false
	    })
		wx.showTabBarRedDot({
			index: 2
		})
	}
	
})
