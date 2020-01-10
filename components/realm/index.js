import {FenceGroup} from "../models/fence-group";import {Judger} from "../models/judger";import string from "../../miniprogram_npm/lin-ui/common/async-validator/validator/string"Component({    /**     * 组件的属性列表     */    properties: {        spu: Object    },    data: {        fences: Array,        judger: Object,        previewImg: String,        title: String,        price: String,        discountPrice: String    },    observers: {        'spu': function (spu) {            if (!spu) {                return            }            const fenceGroup = new FenceGroup(spu)            fenceGroup.initFences()            const judger = new Judger(fenceGroup)            this.data.judger = judger            const defaultSku = fenceGroup.getDefaultSku()            if (defaultSku) {                this.bindSkuData(defaultSku)            } else {                this.bindSpuData()            }            this.bindInitData(fenceGroup)        }    },    methods: {        // 如果默认spu不存在        bindSpuData() {            const spu = this.properties.spu            this.setData({                previewImg: spu.img,                title: spu.title,                price: spu.price,                discountPrice: spu.discount_price            })        },        // 如果默认spu存在        bindSkuData(sku) {            this.setData({                previewImg: sku.img,                title: sku.title,                price: sku.price,                discountPrice: sku.discount_price            })        },        bindInitData(fenceGroup) {            this.setData({                fences: fenceGroup.fences            })        },        onCelltap(event) {            const cell = event.detail.cell            const x = event.detail.x            const y = event.detail.y            const judger = this.data.judger            judger.judge(cell, x, y)            this.setData({                fences: judger.fenceGroup.fences            })        }    }})