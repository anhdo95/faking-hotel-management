import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { InputNumber, Button, Row, Col, Slider, Icon } from 'antd'

import reduce = require('lodash/reduce')

// Components
import SearchBox from '@components/Content/Filter/SearchBox/Container'

// Utils
import { DEFAULT_PAGE, STAR_SLIDER } from '@/util/constants'
import { formatNumberToCurrency, parseCurrencyToNumber } from '@/util/helpers'

// Styles
import './style.scss'


const stars = reduce(STAR_SLIDER.KEY_TO_VALUE, (result: any, value: number, key: number) => {
  result[key] = {
    style: {
      color: '#fe0',
    },
    label: <><i>{value}</i><Icon type="star" theme="filled" /></>
  }

  return result
}, {})

const FIELD = {
  STAR_RANGE: 'starRange',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice'
}

const GRID = { xs: 24, md: 24, lg: 8 }

interface PresenterProps extends RouteComponentProps {
  filter: any,
  onSearch: () => void,
  setHotelFilter: (filter: any) => void
}

interface PresenterState {
}

export default class Presenter extends React.Component<PresenterProps, PresenterState> {
  handleChange = (fieldName: string) => {
    return (value: any) => {
      this.props.setHotelFilter({ [fieldName]: value })
    }
  }

  handleSearch = async () => {
    this.props.setHotelFilter({ pageNumber: DEFAULT_PAGE })
    this.props.onSearch()
  }

  renderStars() {
    return (
      <Slider
        className="header__stars"
        range
        tooltipVisible={false}
        step={20}
        value={this.props.filter.starRange.map(Number)}
        marks={stars}
        onChange={this.handleChange(FIELD.STAR_RANGE)}
      />
    )
  }

  renderPrice(props: any) {
    return (
      <InputNumber
        className={props.className}
        placeholder={props.placeholder}
        value={props.value}
        min={0}
        formatter={formatNumberToCurrency}
        parser={parseCurrencyToNumber}
        onChange={this.handleChange(props.fieldName)}
      />
    )
  }

  renderMinPrice() {
    return this.renderPrice({
      className: 'header__min-price',
      placeholder: 'Min price',
      value: Number(this.props.filter.minPrice),
      fieldName: FIELD.MIN_PRICE
    })
  }

  renderMaxPrice() {
    return this.renderPrice({
      className: 'header__max-price',
      placeholder: 'Max price',
      value: this.props.filter.maxPrice,
      fieldName: FIELD.MAX_PRICE
    })
  }

  render() {
    return (
      <header className="rel header">
        <Row type="flex" justify="space-between" gutter={16}>
          <Col {...GRID}>
            <SearchBox />
          </Col>
          <Col {...GRID}>
            {this.renderStars()}
          </Col>
          <Col>
            <Row type="flex" justify="end">
              <Col>
                {this.renderMinPrice()}
                {this.renderMaxPrice()}
              </Col>
              <Col>
                <Button
                  className="header__search-btn"
                  type="danger"
                  icon="search"
                  onClick={this.handleSearch}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    )
  }
}
