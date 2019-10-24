import Content from '@/components/Content/Container'
import HotelDetail from '@/components/HotelDetail/Container'

export default [
  { path: '/', component: Content },
  { path: '/hotel/:hotelId', component: HotelDetail },
]
