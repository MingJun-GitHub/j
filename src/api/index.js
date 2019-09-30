import axios from '@/utils/axios'

export const getBannerList = async (type = 2) => {
    return await axios.get(`/banner?type=${type}`)
}

