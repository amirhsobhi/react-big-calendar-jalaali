import React from 'react'
import { Calendar } from '../../src'
import TimezoneCalendar from './exampleCode/timezones-jalaali'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

export function ExampleJalaali() {
  return <TimezoneCalendar />
}
ExampleJalaali.storyName = 'Timezones Jalaali'
