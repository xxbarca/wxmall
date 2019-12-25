import { Http } from "../utils/http"

class Theme {
    static async getHomeLocationA() {
        return await Http.request({
            url: '/theme/by/names',
            data: {
                names: 't-1'
            }
        })
    }
}

export {
    Theme
}
