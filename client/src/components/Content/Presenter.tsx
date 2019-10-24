import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, List, Icon, Pagination } from 'antd'
import { ListGridType } from 'antd/lib/list'
import { ParsedQuery } from 'query-string'
import classNames from 'classnames'

import isEmpty = require('lodash/isEmpty')

import Filter from '@/components/Content/Filter/Container'
import Sorting from '@/components/Content/Sorting/Container'

import HotelParams from '@/interfaces/hotel-params'
import { REGEX, ITEM_PER_PAGE } from '@/util/constants'
import { changeUrl, getUrlParams } from '@/util/helpers'

import './style.scss'

const VIEW_MODE: {
  GRID: ListGridType,
  LIST: ListGridType
} = {
  GRID: {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
  LIST: {
    gutter: 16,
    xs: 1
  }
}

interface PresenterProps extends RouteComponentProps {
  hotels: any[],
  totalElements: number,
  totalPage: number,
  filter: any,
  searchHotels: (params: HotelParams | ParsedQuery<string>) => Promise<any[]>,
  setHotelFilter: (filter: any) => void
}

interface PresenterState {
  isListViewMode: boolean,
  viewMode: any,
}

export default class Presenter extends React.Component<PresenterProps, PresenterState> {
  unlisten: any
  pathname: string

  constructor(props: PresenterProps) {
    super(props)

    this.state = {
      isListViewMode: false,
      viewMode: VIEW_MODE.GRID,
    }
  }

  componentDidMount() {
    this.initializeHotels()
    this.unlisten = this.props.history.listen(async (location) => {
      if (location.pathname === '/') {
        setTimeout(() => {
          this.props.searchHotels(this.props.filter)
        }, 0)
      }
    })
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  initializeHotels() {
    const params = getUrlParams(this.props.history)

    if (!isEmpty(params)) {
      this.props.setHotelFilter(params)
      this.props.searchHotels(params)
    } else {
      this.props.searchHotels(this.props.filter)
    }
  }

  handlePaginationChange = (pageNumber: number) => {
    this.props.setHotelFilter({ pageNumber })
    this.handleSearch()
  }

  handleViewModeChange = (viewMode: ListGridType) => {
    return () => {
      this.setState({
        viewMode,
        isListViewMode: viewMode === VIEW_MODE.LIST
      })
    }
  }

  handleSearch = () => {
    setTimeout(() => {
      const { history, location, filter } = this.props

      changeUrl(history, location, filter)
    }, 0)
  }

  renderTop() {
    return (
      <Row type="flex" justify="space-between" gutter={16}>
        <Col {...{ xs: 24, md: 16 }}>
          {!!this.props.totalElements && <h2>{this.props.totalElements} hotels</h2>}
        </Col>
        <Col {...{ xs: 24, md: 8 }}>
          <Row className="content__right" type="flex">
            <Sorting onSearch={this.handleSearch} />
            <Icon
              className="content__grid-view"
              type="appstore"
              onClick={this.handleViewModeChange(VIEW_MODE.GRID)}
            />
            <Icon
              className="content__list-view"
              type="menu"
              onClick={this.handleViewModeChange(VIEW_MODE.LIST)}
            />
          </Row>
        </Col>
      </Row>
    )
  }

  renderThumbnai(hotel: any, index: number) {
    const { name } = hotel

    const hotelImages = [
      '/assets/images/hotels/hotel-4431944_960_720.jpg',
      '/assets/images/hotels/hotel-4431938_960_720.jpg',
      '/assets/images/hotels/hotel-2400364_960_720.jpg'
    ]

    // Random images for demo
    const randomImage = hotelImages[(index + 1) % 3]

    return (
      <div className="content__hotel-img-wrap">
        <figure className="content__hotel-thumb">
          <img className="abs-full content__hotel-img" src={randomImage} alt={name} />
        </figure>
      </div>
    )
  }

  renderDescription(hotel: any) {
    return (
      <div className="content__hotel-content">
        <section className="flex-column content__hotel-content-inner">
          <h3 className="content__hotel-name">{hotel.name}</h3>
          <p className="content__hotel-description">3 guests · 1 bedroom · 1 bathroom</p>
          <p className="content__hotel-price">
            <strong>
              {hotel.cheapestPrice.toString().replace(REGEX.NUMBER_TO_CURRENCY_FORMAT, ',')}₫/night
            </strong>
          </p>
          <p className="content__hotel-location">{hotel.addressLines}</p>
          <p>{this.renderStars(hotel)}</p>
        </section>
      </div>
    )
  }

  renderStars(hotel: any) {
    let { stars } = hotel
    const svgUrls = []

    while (stars) {
      if (stars >= 1) {
        svgUrls.push('/assets/svg/star.svg')
      } else if (stars === 0.5) {
        svgUrls.push('/assets/svg/half-star.svg')
        break
      }

      stars--
    }

    return svgUrls.map((svgUrl, index) => (
      <img key={index} className="content__star" src={svgUrl} />
    ))
  }

  renderHotels() {
    const listItemClassName = classNames('content__hotel flex-column', {
      'content__hotel--listview': this.state.isListViewMode,
    })

    return (
      <List
        className="content__hotels"
        grid={this.state.viewMode}
        dataSource={this.props.hotels}
        renderItem={(hotel, index) => (
          <List.Item>
            <Link className={listItemClassName} to={`/hotel/${hotel.hotelId}`}>
              {this.renderThumbnai(hotel, index)}
              {this.renderDescription(hotel)}
            </Link>
          </List.Item>
        )}
      />
    )
  }

  renderPagination() {
    const { hotels, totalElements, filter } = this.props

    return hotels && totalElements > ITEM_PER_PAGE && (
      <Pagination
        className="content__pagination"
        current={Number(filter.pageNumber)}
        pageSize={ITEM_PER_PAGE}
        total={totalElements}
        onChange={this.handlePaginationChange}
      />
    )
  }

  render() {
    return (
      <>
        <Filter onSearch={this.handleSearch} />
        <section className="content">
          {this.renderTop()}
          {this.renderHotels()}
          {this.renderPagination()}
        </section>
      </>
    )
  }
}
