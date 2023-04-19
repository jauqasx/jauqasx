import { request } from '@/utils/request'
import { carouselMapType, geci } from '@/types/discoverMusic'
// 轮播图
export const carouselMap = (data: { type: number }) => request<carouselMapType>('banner', 'get', data)
// 歌曲详情
export const getSongById = () => request('song/detail?ids=2039744487', 'GET')
//歌词
export const getLyricById = () => request<geci>('lyric?id=2039744487', 'GET')