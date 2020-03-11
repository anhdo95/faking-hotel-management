export default {
  hotel: {
    search: `${process.env.BASE_URL}/hotels/query_basic`,
    detail: `${process.env.BASE_URL}/hotel/:id`,
  },
  destination: {
    search: `${process.env.BASE_URL}/destination/suggess`
  }
}
