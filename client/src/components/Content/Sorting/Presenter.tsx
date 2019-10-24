import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'

import map = require('lodash/map')

import { SORTING_HOTEL_OPTIONS } from '@/util/constants'

interface PresenterProps extends RouteComponentProps {
  filter: any,
  setSortFilter: (sort: any) => void,
  onSearch: () => void
}

export default class Presenter extends React.Component<PresenterProps> {
  handleSelect = (sort: string) => {
    this.props.setSortFilter(sort)
    this.props.onSearch()
  }

  render() {
    return (
      <Select
        value={this.props.filter.sort || undefined}
        size="large"
        style={{ width: 250 }}
        placeholder="Order by: Select"
        onSelect={this.handleSelect}
      >
        {map(SORTING_HOTEL_OPTIONS, (option) => (
          <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
        ))}
      </Select>
    )
  }
}
